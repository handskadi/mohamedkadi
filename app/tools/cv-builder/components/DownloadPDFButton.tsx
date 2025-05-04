"use client";

import dynamic from "next/dynamic";
import CVDocument from "./CVDocument";
import { useState, useEffect } from "react";

// Dynamically import PDFDownloadLink with SSR disabled
const PDFDownloadLink = dynamic(
    () =>
        import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <button
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
                Preparing...
            </button>
        ),
    }
);

export default function DownloadPDFButton() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ensure this component renders only on client
    }, []);

    return isClient ? (
        <PDFDownloadLink document={<CVDocument />} fileName="my-resume.pdf">
            {({ loading }) => (
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? "Preparing..." : "Download PDF"}
                </button>
            )}
        </PDFDownloadLink>
    ) : null;
}
