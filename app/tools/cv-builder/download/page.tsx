"use client";

import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CVPrintableWrapper from "./CVPrintableWrapper";

export default function DownloadPage() {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "my-resume",
        removeAfterPrint: true,
    });

    return (
        <div className="min-h-screen bg-[#20B86D] py-10 px-4 mt-[80px]">
            {/* Header */}
            <div className="text-center text-white mb-10">
                <h1 className="text-4xl font-bold">Your resume is ready!</h1>
                <p className="mt-2 text-lg">You can now preview and download your resume.</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 bg-white rounded-md shadow-md p-6">
                {/* Benefits section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Benefits</h2>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li>✅ You can download your CV anytime</li>
                        <li>✅ Edit or update your CV later</li>
                        <li>✅ Choose from professional templates</li>
                        <li>✅ Unlimited custom sections</li>
                        <li>✅ Add languages, achievements, etc.</li>
                        <li>✅ Download as PDF</li>
                    </ul>
                    <button
                        onClick={handlePrint}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>

                {/* CV Preview */}
                <div
                    ref={printRef}
                    className="border bg-white rounded p-4 max-h-[800px] overflow-y-auto"
                    style={{
                        backgroundColor: "#fff",
                        color: "#000",
                        fontFamily: "Arial, sans-serif",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                    }}
                >
                    <CVPrintableWrapper />
                </div>
            </div>

            {/* Navigation */}
            <div className="text-center mt-8">
                <Link href="/tools/cv-builder/templates">
                    <button className="text-white text-sm flex items-center justify-center hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Previous step
                    </button>
                </Link>
            </div>

            <div className="text-center text-xs text-white opacity-70 mt-6 max-w-xl mx-auto">
                You can always come back to edit and download your CV. No payment required — enjoy full access to all resume features.
            </div>
        </div>
    );
}
