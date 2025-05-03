"use client";

import { useCVStore } from "../context/useCVStore";
import Template1 from "../templates/CVTemplates/Template1";

export default function CVPrintableWrapper() {
    const { selectedTemplate } = useCVStore();

    if (selectedTemplate === "template1" || !selectedTemplate) {
        return <Template1 />;
    }

    // Add more templates when needed
    return <Template1 />;
}
