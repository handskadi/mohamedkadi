"use client";

import { useCVStore } from "../context/useCVStore";
import Template1 from "./CVTemplates/Template1";

export default function CVTemplatePreview() {
  const { selectedTemplate } = useCVStore();

  switch (selectedTemplate) {
    case "Template1":
      return <Template1 />;
    default:
      return (
        <p className="text-gray-500 text-sm italic">
          Please select a template to preview your CV.
        </p>
      );
  }
}
