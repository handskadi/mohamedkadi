import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import path from 'path';
import fs from 'fs/promises'


export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json()
  const autoReplyTemplate = path.join(process.cwd(), 'app/api/contact/templates/autoReplyToSender.html');
  let html = await fs.readFile(autoReplyTemplate, 'utf-8');

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const siteOwnerEmail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email, // <-- 📩 sender's email shows in your reply
    subject: '📩 New Contact Form Submission',
    html: `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  }
  
  const autoReplyToSender = {
    from: process.env.EMAIL_USER,
    to: email,
    replyTo: process.env.EMAIL_USER, // <-- your contact@ for replies
    subject: '✅ Thank you for contacting Mohamed KADI',
    html: html
      .replace(/{{name}}/g, name),
    // html: `
    //   <p>Hi ${name},</p>
    //   <p>Thanks for reaching out! Your message has been received and I’ll get back to you as soon as possible.</p>
    //   <br />
    //   <p>Best regards,</p>
    //   <p><strong>Mohamed KADI</strong></p>
    //   <p><a href="https://mohamedkadi.com">mohamedkadi.com</a></p>
    // `,
  }
  

  try {
    await transporter.sendMail(siteOwnerEmail)
    await transporter.sendMail(autoReplyToSender)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false, error })
  }
}
