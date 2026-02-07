import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email || "")
    .trim()
    .toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  // Templates
  const baseDir = path.join(process.cwd(), "app/api/newsletter/templates");
  const autoReplyTemplatePath = path.join(baseDir, "autoReplyToSubscriber.html");
  const siteOwnerTemplatePath = path.join(baseDir, "siteOwnerEmail.html");

  const [autoReplyHtml, siteOwnerHtml] = await Promise.all([
    fs.readFile(autoReplyTemplatePath, "utf-8"),
    fs.readFile(siteOwnerTemplatePath, "utf-8"),
  ]);

  // Transporter (same env vars as contact route)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const now = new Date().toISOString();

  // 1) Notify you
  const siteOwnerEmail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "📰 New Newsletter Subscription",
    html: siteOwnerHtml.replace(/{{email}}/g, email).replace(/{{date}}/g, now),
  };

  // 2) Auto reply to subscriber
  const autoReplyToSubscriber = {
    from: process.env.EMAIL_USER,
    to: email,
    replyTo: process.env.EMAIL_USER,
    subject: "✅ You’re subscribed!",
    html: autoReplyHtml.replace(/{{email}}/g, email),
  };

  try {
    await transporter.sendMail(siteOwnerEmail);
    await transporter.sendMail(autoReplyToSubscriber);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter email error:", error);
    return NextResponse.json({ success: false, error: "Email send failed" }, { status: 500 });
  }
}
