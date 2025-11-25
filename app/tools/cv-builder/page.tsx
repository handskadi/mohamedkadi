// app/tools/cv-builder/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { Smile, LayoutTemplate, ScanLine, FileText, FileDown, ImageIcon } from "lucide-react";

// SEO Metadata
export const metadata: Metadata = {
  title: "Free CV Builder | Create Your Resume Online | ATS Friendly",
  description:
    "Build a professional, ATS-friendly CV in minutes. No signup required. Choose from modern templates and export your resume as a PDF — for free!",
  keywords: [
    "CV builder",
    "free resume maker",
    "ATS friendly CV",
    "download resume",
    "job CV generator",
    "professional CV",
    "no login CV builder",
  ],
  openGraph: {
    title: "Free CV Builder | ATS-Optimized Resume Generator",
    description:
      "Create a job-winning CV with our free builder. Choose a template, fill in your info, and download your resume instantly — no sign-up needed.",
    url: "https://mohamedkadi.com/tools/cv-builder",
    siteName: "YourSiteName",
    images: [
      {
        url: "https://mohamedkadi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free CV Builder - Create Resume Online",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CV Builder | Create a Resume Online for Free",
    description:
      "Use our step-by-step CV builder to generate a professional resume in minutes. No sign-up. Just download.",
    images: ["https://mohamedkadi.com/og-image.png"],
  },
};

export default function CVBuilderLandingPage() {
  const features = [
    {
      title: "Free & Easy to Use",
      desc: "No signup or payment required — just build and export.",
      icon: <Smile className="text-green-500 w-6 h-6 mb-2" />,
    },
    {
      title: "Modern Templates",
      desc: "Choose from stylish, professional CV designs.",
      icon: <LayoutTemplate className="text-green-500 w-6 h-6 mb-2" />,
    },
    {
      title: "ATS Friendly",
      desc: "Pass automated resume scanners with optimized layouts.",
      icon: <ScanLine className="text-green-500 w-6 h-6 mb-2" />,
    },
    {
      title: "Multi-Step Builder",
      desc: "Enter details step by step with live preview.",
      icon: <FileText className="text-green-500 w-6 h-6 mb-2" />,
    },
    {
      title: "Download as PDF",
      desc: "Export your resume as a clean, sharable PDF.",
      icon: <FileDown className="text-green-500 w-6 h-6 mb-2" />,
    },
    {
      title: "Optional Photo",
      desc: "Add a profile photo if desired — or leave it out.",
      icon: <ImageIcon className="text-green-500 w-6 h-6 mb-2" />,
    },
  ];

  return (
    <main className="bg-white text-gray-800 mt-[80px]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Build a Job-Winning CV</h1>
          <p className="text-lg sm:text-xl mb-8">
            Professional. ATS-friendly. Designed for success.
          </p>
          <Link href="/tools/cv-builder/personal-details">
            <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition">
              Start Building Your CV
            </button>
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Use Our CV Builder?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ title, desc, icon }) => (
              <div key={title} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                <div className="flex flex-col items-center">
                  {icon}
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              ["1. Enter Your Info", "Go step by step: personal details, experience, skills, etc."],
              ["2. Choose a Template", "Select from professionally designed CV layouts."],
              ["3. Download Your CV", "Preview, export, or edit as needed — instantly!"],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white p-6 rounded shadow-md border">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="space-y-8">
            {[
              ["“This is hands down the best free CV builder I’ve used.”", "— Amina, Graduate"],
              [
                "“Clean templates, no login, and my resume got shortlisted twice!”",
                "— John, Developer",
              ],
              [
                "“Loved how I could add or remove photo and change templates instantly.”",
                "— Sara, Designer",
              ],
            ].map(([quote, author]) => (
              <blockquote
                key={quote}
                className="bg-white p-6 rounded shadow italic border-l-4 border-green-500"
              >
                <p>{quote}</p>
                <span className="block mt-2 text-sm text-gray-500">{author}</span>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              [
                "Is this really free?",
                "Yes! No sign-up, no hidden costs. Build and download your CV for free.",
              ],
              [
                "Will my CV be ATS friendly?",
                "Absolutely. Our layouts are designed to pass resume scanners.",
              ],
              [
                "Can I include a photo?",
                "Yes — you can upload a photo, or leave it out if you prefer.",
              ],
              [
                "Can I edit my CV later?",
                "Yes, you can go back and change any section anytime before download.",
              ],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="font-semibold text-lg">{q}</h3>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-green-600 text-white text-center py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your CV?</h2>
          <p className="mb-6">It only takes a few minutes. No signup needed.</p>
          <Link href="/tools/cv-builder/personal-details">
            <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition">
              Start Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
