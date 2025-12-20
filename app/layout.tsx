import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed KADI | Full Stack Developer | MERN, Next.js, WordPress",
  description:
    "Mohamed KADI, a Full Stack Developer, specializes in MERN, React, Next.js, and WordPress, crafting custom themes, plugins & scalable Python apps with Flask.",
  authors: [
    {
      name: "Mohamed KADI",
      url: "https://mohamedkadi.com",
    },
  ],
  keywords:
    "Full Stack Developer, MERN, React, Next.js, WordPress, Flask, Python, Web Development, Custom Themes, Plugins",
  alternates: {
    canonical: "https://mohamedkadi.com/",
  },

  openGraph: {
    title: "Mohamed KADI | Full Stack Developer | MERN, Next.js, WordPress",
    description:
      "Full Stack Developer specializing in React, Next.js, MERN, WordPress, and Python Flask. Expert in web development and scalable applications.",
    url: "https://mohamedkadi.com",
    siteName: "Mohamed KADI Portfolio",
    images: [
      {
        url: "https://mohamedkadi.com/mohamedkadi.jpg", // ✅ Use full URL
        width: 1200,
        height: 630,
        alt: "Mohamed KADI - Full Stack Developer",
      },
    ],
    type: "website",
  },

  // ✅ Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Mohamed KADI | Full Stack Developer",
    description:
      "Expert in React, Next.js, MERN, and WordPress. Specializing in web development, custom themes, and scalable applications.",
    images: ["https://mohamedkadi.com/mohamedkadi.jpg"],
  },
};
const GTM_ID = "GTM-54SPGC3S";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className="dark:bg-gray-900 transition-colors">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main className="container mx-auto mt-8">{children}</main>
        <SpeedInsights />
        <Footer />
        {/* ✅ Schema.org JSON-LD for Full Stack Developer */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed KADI",
              url: "https://mohamedkadi.com",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "Full Stack Development",
                "React",
                "Next.js",
                "MERN Stack",
                "WordPress Development",
                "Custom Themes",
                "Plugins",
                "Flask",
                "Python",
                "API Development",
              ],
              sameAs: [
                "https://www.linkedin.com/in/mohamedkadi",
                "https://github.com/handskadi",
                "https://twitter.com/handskadi",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
