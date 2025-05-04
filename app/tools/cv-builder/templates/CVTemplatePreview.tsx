"use client";

import Template1 from "./CVTemplates/Template1";
import Template2 from "./CVTemplates/Template2";
import { useCVStore } from "../context/useCVStore";

export default function CVTemplatePreview() {
  const { selectedTemplate } = useCVStore();

  if (selectedTemplate === "template2") {
    return <Template2 />;
  }

  return <Template1 />;
}
