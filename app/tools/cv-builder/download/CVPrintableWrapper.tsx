"use client";

import { useCVStore } from "../context/useCVStore";
import Template1PDF from "../templates/CVTemplates/Template1PDF";
import Template2PDF from "../templates/CVTemplates/Template2PDF";

export default function CVPrintableWrapper() {
  const { selectedTemplate = "template1", personal } = useCVStore();

  if (!personal || !personal.firstName) {
    return (
      <p className="text-gray-500 text-sm">
        No CV data found. Please go back and fill out your resume.
      </p>
    );
  }

  switch (selectedTemplate) {
    case "template2":
      return <Template2PDF />;
    case "template1":
    default:
      return <Template1PDF />;
  }
}
