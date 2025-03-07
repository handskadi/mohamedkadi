import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed KADI - Full Stack Developer",
  description: "Mohamed KADI is a versatile Full Stack Developer specializing in MERN, React, Next.js, and WordPress development, including custom themes and plugins. He also works on Python projects using Flask, building scalable and efficient applications.",
  authors: [
    {
      name: "Mohamed KADI",
      url: "https://mohamedkadi.com", 
    }
  ],
  keywords: "Full Stack Developer, MERN, React, Next.js, WordPress, Flask, Python, Web Development, Custom Themes, Plugins",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
