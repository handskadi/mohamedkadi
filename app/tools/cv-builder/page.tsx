// app/tools/cv-builder/page.tsx
import Link from "next/link";

export default function CVBuilderLandingPage() {
    return (
        <main className="bg-white text-gray-800">
            {/* HERO */}
            <section className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Build a Job-Winning CV</h1>
                    <p className="text-lg sm:text-xl mb-8">Professional. ATS-friendly. Designed for success.</p>
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
                        {[
                            ["Free & Easy to Use", "No signup or payment required — just build and export."],
                            ["Modern Templates", "Choose from stylish, professional CV designs."],
                            ["ATS Friendly", "Pass automated resume scanners with optimized layouts."],
                            ["Multi-Step Builder", "Enter details step by step with live preview."],
                            ["Download as PDF", "Export your resume as a clean, sharable PDF."],
                            ["Optional Photo", "Add a profile photo if desired — or leave it out."],
                        ].map(([title, desc]) => (
                            <div key={title} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                                <p className="text-gray-600">{desc}</p>
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
                            ["“Clean templates, no login, and my resume got shortlisted twice!”", "— John, Developer"],
                            ["“Loved how I could add or remove photo and change templates instantly.”", "— Sara, Designer"],
                        ].map(([quote, author]) => (
                            <blockquote key={quote} className="bg-white p-6 rounded shadow italic border-l-4 border-green-500">
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
                            ["Is this really free?", "Yes! No sign-up, no hidden costs. Build and download your CV for free."],
                            ["Will my CV be ATS friendly?", "Absolutely. Our layouts are designed to pass resume scanners."],
                            ["Can I include a photo?", "Yes — you can upload a photo, or leave it out if you prefer."],
                            ["Can I edit my CV later?", "Yes, you can go back and change any section anytime before download."],
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
