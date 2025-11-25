"use client";

import { useEffect, useState } from "react";

interface FaviconPreviewProps {
  faviconBlob: Blob;
  mode: "light" | "dark";
  projectName: string;
  websiteURL: string;
  description?: string;
  onClear?: () => void;
}

export default function FaviconPreview({
  faviconBlob,
  mode,
  projectName,
  websiteURL,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
}: FaviconPreviewProps) {
  const [faviconURL, setFaviconURL] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(faviconBlob);
    setFaviconURL(url);
    return () => URL.revokeObjectURL(url);
  }, [faviconBlob]);

  const isDark = mode === "dark";

  return (
    <div className="space-y-6">
      {/* Browser Tab Preview */}
      <div>
        <h3 className="text-xl font-bold mb-2">Browser</h3>
        <div className="flex flex-wrap gap-4">
          {/* Light tab */}
          <div className="bg-gray-200 rounded-t-lg shadow-inner p-2 w-52">
            <div className="flex items-center justify-between bg-white rounded px-2 py-1 border border-gray-300">
              {faviconURL && <img src={faviconURL} alt="favicon" className="w-4 h-4 mr-1" />}
              <span className="text-xs text-gray-700 truncate flex-1">{projectName}</span>
              <span className="text-gray-400 text-sm ml-1">×</span>
            </div>
            <p className="text-xs text-center mt-1 text-gray-500">Light theme</p>
          </div>

          {/* Dark tab */}
          <div className="bg-gray-800 rounded-t-lg shadow-inner p-2 w-52">
            <div className="flex items-center justify-between bg-gray-900 rounded px-2 py-1 border border-gray-700">
              {faviconURL && <img src={faviconURL} alt="favicon" className="w-4 h-4 mr-1" />}
              <span className="text-xs text-white truncate flex-1">{projectName}</span>
              <span className="text-gray-400 text-sm ml-1">×</span>
            </div>
            <p className="text-xs text-center mt-1 text-gray-400">Dark theme</p>
          </div>
        </div>
      </div>

      {/* Google Search Preview */}
      <div>
        <h3 className="text-xl font-bold mb-2">Google Result Page</h3>
        <div
          className={`w-full max-w-xl border rounded shadow px-4 py-3 ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          <div className="flex items-center mb-1">
            {faviconURL && <img src={faviconURL} alt="favicon" className="w-4 h-4 mr-1" />}
            <span className="text-sm font-medium">{websiteURL}</span>
          </div>
          <h4 className="text-blue-600 font-semibold text-lg mb-1">{projectName}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
