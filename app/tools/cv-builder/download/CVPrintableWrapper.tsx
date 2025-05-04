"use client";

import { useCVStore } from "../context/useCVStore";
import Template1 from "../templates/CVTemplates/Template1";

export default function CVPrintableWrapper() {
    const { selectedTemplate, personal } = useCVStore();

    // Early return if data is missing to avoid errors
    if (!personal || !personal.firstName) {
        return <p className="text-gray-500 text-sm">No CV data found. Please go back and fill out your resume.</p>;
    }

    // Only support Template1 for now
    return selectedTemplate === "template1" || !selectedTemplate ? (
        <Template1 />
    ) : (
        <Template1 />
    );
}
