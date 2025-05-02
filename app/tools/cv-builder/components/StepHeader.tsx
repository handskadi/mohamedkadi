// components/StepHeader.tsx
"use client";

type StepHeaderProps = {
    title: string;
    currentStep: number;
};

export default function StepHeader({ title, currentStep }: StepHeaderProps) {
    const steps = [
        { number: 1, label: "Personal" },
        { number: 2, label: "Experiences" },
        { number: 3, label: "Template" },
    ];

    return (
        <section className="bg-green-500 text-white py-10 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>

            <div className="mt-6 flex justify-center gap-4 text-sm">
                {steps.map((step, idx) => (
                    <>
                        {idx !== 0 && <div className="w-6 h-px bg-white my-auto" />}
                        <div
                            key={step.number}
                            className={`flex items-center gap-1 ${step.number === currentStep
                                ? "opacity-90"
                                : step.number < currentStep
                                    ? "opacity-100"
                                    : "opacity-60"
                                }`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${step.number === currentStep
                                    ? "bg-white text-green-600"
                                    : "border-2 border-white text-white"
                                    }`}
                            >
                                {step.number}
                            </div>
                            <span>{step.label}</span>
                        </div>
                    </>
                ))}
            </div>
        </section>
    );
}
