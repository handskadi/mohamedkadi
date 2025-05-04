import { Document, Page } from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";
import Template1PDF from "../templates/CVTemplates/Template1PDF";

export default function CVDocument() {
    const { selectedTemplate } = useCVStore();

    return (
        <Document title="my-resume">
            <Page size="A4" style={{ paddingTop: 40, paddingBottom: 40, paddingHorizontal: 35 }}>
                {selectedTemplate === "template1" || !selectedTemplate ? (
                    <Template1PDF />
                ) : (
                    <Template1PDF />
                )}
            </Page>
        </Document>
    );
}
