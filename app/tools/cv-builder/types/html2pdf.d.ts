// types/html2pdf.d.ts
declare module "html2pdf.js";
declare module "react-to-print" {
  import * as React from "react";

  export interface UseReactToPrintOptions {
    content: () => React.ReactInstance | null;
    documentTitle?: string;
    onAfterPrint?: () => void;
    onBeforePrint?: () => void;
    removeAfterPrint?: boolean;
    pageStyle?: string | (() => string);
    print?: (target: HTMLIFrameElement) => void;
    suppressErrors?: boolean;
    copyStyles?: boolean;
    bodyClass?: string;
    nonce?: string;
  }

  export function useReactToPrint(options: UseReactToPrintOptions): () => void;
}

export type ExperienceItem = {
  title: string;
  company: string; // ✅ This line is missing
  startDate: string;
  endDate: string;
  description: string;
};
