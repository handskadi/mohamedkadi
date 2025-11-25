"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useCVStore } from "../context/useCVStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Dynamic import (no SSR)
const DownloadPDFButton = dynamic(() => import("../components/DownloadPDFButton"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-white text-lg font-medium">Preparing download...</p>
  ),
});

export default function DownloadPage() {
  const { personal } = useCVStore();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!personal?.firstName || !personal?.lastName) {
      router.push("/tools/cv-builder");
    } else {
      setIsReady(true);
    }
  }, [personal, router]);

  return (
    <div className="min-h-screen bg-[#20B86D] py-16 px-4 mt-[80px] flex flex-col justify-center items-center text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-2">🎉 Your CV is ready!</h1>
        <p className="text-lg font-medium">Download your professionally styled resume below</p>
      </div>

      {/* Download Button Box */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg px-10 py-8">
        {isReady ? (
          <DownloadPDFButton />
        ) : (
          <p className="text-center text-gray-500 text-base">Loading your CV data...</p>
        )}
      </div>

      {/* Back to Templates */}
      <div className="mt-10 text-center">
        <Link href="/tools/cv-builder/templates">
          <button className="inline-flex items-center gap-2 bg-white text-[#20B86D] px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Templates
          </button>
        </Link>
      </div>
    </div>
  );
}
