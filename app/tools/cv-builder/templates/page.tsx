"use client";

import { useCVStore } from "../context/useCVStore";
import Link from "next/link";
import CVTemplatePreview from "./CVTemplatePreview";
import PreviewSectionsModal from "./PreviewSectionsModal";
import { useState } from "react";
import StepHeader from "../components/StepHeader";

export default function TemplateSelectionPage() {
    const { selectedTemplate, setSelectedTemplate } = useCVStore();
    const [showModal, setShowModal] = useState(false);

    const templates = [
        { id: "Template1", name: "Minmal Pro", previewImg: "/template1.webp" },
        { id: "template2", name: "Tizgzaouin", previewImg: "/template2.webp" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 mt-[80px] pb-20">
            {/* Top Header */}
            <StepHeader title="Choose a CV Template" currentStep={3} />


            {/* Template Select & Preview */}
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-sm mt-[-20px]">
                <h2 className="text-xl font-semibold mb-4">Select a template:</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                    {templates.map((tpl) => (
                        <div
                            key={tpl.id}
                            className={`border rounded p-4 cursor-pointer hover:shadow transition ${selectedTemplate === tpl.id ? "ring-2 ring-green-500" : "border-gray-300"
                                }`}
                            onClick={() => setSelectedTemplate(tpl.id)}
                        >
                            <div className="w-full relative pb-[141.4%] bg-white mb-2 rounded overflow-hidden">
                                <img
                                    src={tpl.previewImg}
                                    alt={tpl.name}
                                    className="absolute top-0 left-0 w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center font-medium">{tpl.name}</p>
                        </div>
                    ))}
                </div>


                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Live Preview:</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        ⚙️ Customize Sections
                    </button>
                </div>

                <div className="border rounded p-6 bg-gray-50">
                    <CVTemplatePreview />
                </div>

                <div className="text-center mt-10">
                    <Link href="/tools/cv-builder/download">
                        <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-semibold cursor-pointer">
                            Continue to Download →
                        </button>
                    </Link>
                </div>
                <div className="text-center mt-10">
                    <Link href="/tools/cv-builder/experiences">
                        <button className="text-gray-400 hover:text-gray-600 font-semibold text-sm cursor-pointer">
                            <span className="flex items-center">
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous step
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <PreviewSectionsModal open={showModal} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}
