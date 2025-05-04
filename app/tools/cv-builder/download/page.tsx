"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const DownloadPDFButton = dynamic(
    () => import("../components/DownloadPDFButton"),
    { ssr: false }
);

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-[#20B86D] py-10 px-4 mt-[80px]">
            <div className="text-center text-white mb-10">
                <h1 className="text-4xl font-bold">Your resume is ready!</h1>
                <p className="mt-2 text-lg">Download your PDF below</p>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6">
                <DownloadPDFButton />
            </div>

            <div className="text-center mt-8">
                <Link href="/tools/cv-builder/templates">
                    <button className="text-white text-sm flex items-center justify-center hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to templates
                    </button>
                </Link>
            </div>
        </div>
    );
}
