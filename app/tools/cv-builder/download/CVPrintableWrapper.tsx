"use client";

import { useCVStore } from "../context/useCVStore";
import Template1 from "../templates/CVTemplates/Template1";

export default function CVPrintableWrapper() {
    const { selectedTemplate } = useCVStore();
    return <>{!selectedTemplate || selectedTemplate === "template1" ? <Template1 /> : <Template1 />}</>;
}
