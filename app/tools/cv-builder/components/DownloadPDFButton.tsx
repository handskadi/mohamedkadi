// components/pdf/DownloadPDFButton.tsx
"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "./CVDocument";

export default function DownloadPDFButton() {
    return (
        <PDFDownloadLink
            document={<CVDocument />}
            fileName="my-resume.pdf"
        >
            {({ loading }) => (
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? "Preparing..." : "Download PDF"}
                </button>
            )}
        </PDFDownloadLink>
    );
}
