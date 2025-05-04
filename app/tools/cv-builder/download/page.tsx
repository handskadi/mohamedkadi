"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useCVStore } from "../context/useCVStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Dynamically import the PDF component (no SSR!)
const DownloadPDFButton = dynamic(() => import("../components/DownloadPDFButton"), {
    ssr: false,
    loading: () => <p className="text-center text-white">Preparing download...</p>,
});

export default function DownloadPage() {
    const { personal } = useCVStore();
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Redirect if required fields are missing (adjust as needed)
        if (!personal || !personal.firstName || !personal.lastName) {
            router.push("/tools/cv-builder");
        } else {
            setIsReady(true);
        }
    }, [personal]);

    return (
        <div className="min-h-screen bg-[#20B86D] py-10 px-4 mt-[80px]">
            <div className="text-center text-white mb-10">
                <h1 className="text-4xl font-bold">Your resume is ready!</h1>
                <p className="mt-2 text-lg">Download your PDF below</p>
            </div>

            <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6">
                {isReady ? <DownloadPDFButton /> : <p className="text-center text-gray-500">Loading your CV data...</p>}
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
