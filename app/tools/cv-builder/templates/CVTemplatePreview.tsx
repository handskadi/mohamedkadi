
"use client";

import Template1 from "./CVTemplates/Template1";
import { useCVStore } from "../context/useCVStore";

export default function CVTemplatePreview() {
  const { selectedTemplate } = useCVStore();

  if (selectedTemplate === "template1") {
    return <Template1 />;
  }

  return <Template1 />; // fallback to Template1
}
