import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  // Define template paths
  const baseDir = path.join(process.cwd(), "app/api/contact/templates");
  const autoReplyTemplatePath = path.join(baseDir, "autoReplyToSender.html");
  const siteOwnerTemplatePath = path.join(baseDir, "siteOwnerEmail.html");

  // Read HTML templates
  const autoReplyHtml = await fs.readFile(autoReplyTemplatePath, "utf-8");
  const siteOwnerHtml = await fs.readFile(siteOwnerTemplatePath, "utf-8");

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Fill dynamic fields in auto-reply email (to sender)
  const autoReplyToSender = {
    from: process.env.EMAIL_USER,
    to: email,
    replyTo: process.env.EMAIL_USER,
    subject: "✅ Thank you for contacting Mohamed KADI",
    html: autoReplyHtml.replace(/{{name}}/g, name),
  };

  // Fill dynamic fields in site owner email
  const siteOwnerEmail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "📩 New Contact Form Submission",
    html: siteOwnerHtml
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{phone}}/g, phone)
      .replace(/{{message}}/g, message.replace(/\n/g, "<br>")), // Optional: Preserve line breaks
  };

  try {
    await transporter.sendMail(siteOwnerEmail);
    await transporter.sendMail(autoReplyToSender);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error });
  }
}
