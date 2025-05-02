"use client";

import { Dialog } from "@headlessui/react";
import { Switch } from "@headlessui/react";
import { useCVStore } from "../context/useCVStore";
import { useState } from "react";

export default function PreviewSectionsModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const { visibleSections, reorderSections, togglePreviewSection, hiddenSections } = useCVStore();

    const allSections = [
        "objective",
        "experience",
        "education",
        "skills",
        "languages",
        "courses",
        "publications",
        "achievements",
        "interests",
        "references",
        "custom",
    ];

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-xl space-y-6">
                    <Dialog.Title className="text-lg font-semibold">
                        Show / Hide CV Sections
                    </Dialog.Title>

                    <div className="space-y-4">
                        {allSections.map((key) => (
                            <div
                                key={key}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <span className="capitalize">{key}</span>
                                <Switch
                                    checked={!hiddenSections.includes(key)}
                                    onChange={() => togglePreviewSection(key)}
                                    className={`${!hiddenSections.includes(key) ? "bg-green-500" : "bg-gray-300"
                                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                    <span className="sr-only">Toggle section</span>
                                    <span
                                        className={`${!hiddenSections.includes(key)
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                    />
                                </Switch>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 text-right">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Done
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
