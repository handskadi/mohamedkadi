"use client";

import Link from "next/link";

type StepHeaderProps = {
    title: string;
    currentStep: number;
};

export default function StepHeader({ title, currentStep }: StepHeaderProps) {
    const steps = [
        { number: 1, label: "Personal", href: "/tools/cv-builder/personal-details" },
        { number: 2, label: "Experiences", href: "/tools/cv-builder/experiences" },
        { number: 3, label: "Template", href: "/tools/cv-builder/templates" },
    ];

    return (
        <section className="bg-green-500 text-white py-10 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>

            <div className="mt-6 flex justify-center gap-4 text-sm">
                {steps.map((step, idx) => (
                    <div key={step.number} className="flex items-center gap-1">
                        {idx !== 0 && <div className="w-6 h-px bg-white my-auto" />}
                        {step.number === currentStep ? (
                            <div
                                className={`flex items-center gap-1 opacity-90`}
                            >
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-white text-green-600">
                                    {step.number}
                                </div>
                                <span>{step.label}</span>
                            </div>
                        ) : (
                            <Link
                                href={step.href}
                                className="flex items-center gap-1 opacity-60 hover:opacity-100 transition"
                            >
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white text-white">
                                    {step.number}
                                </div>
                                <span className="underline">{step.label}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
