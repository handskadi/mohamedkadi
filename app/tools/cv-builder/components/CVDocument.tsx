// components/pdf/CVDocument.tsx
"use client";

import { Document, Page } from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";
import Template1PDF from "../templates/CVTemplates/Template1PDF";
import Template2PDF from "../templates/CVTemplates/Template2PDF"; // ⬅️ make sure this exists

export default function CVDocument() {
    const { selectedTemplate } = useCVStore();

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case "template2":
                return <Template2PDF />;
            case "template1":
            default:
                return <Template1PDF />;
        }
    };

    return (
        <Document title="my-resume">
            <Page
                size="A4"
                style={{
                    paddingTop: 40,
                    paddingBottom: 40,
                    paddingHorizontal: 35,
                }}
            >
                {renderTemplate()}
            </Page>
        </Document>
    );
}
