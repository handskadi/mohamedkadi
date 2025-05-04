import React from "react";

export const getLevelLabel = (val: string | number): string => {
    const num = parseInt(val as string);
    const cefr: Record<number, string> = {
        120: "A1", 130: "A2", 140: "B1", 160: "B2", 180: "C1", 200: "C2"
    };
    if (cefr[num]) return cefr[num];
    if (num >= 90) return "Expert";
    if (num >= 75) return "Experienced";
    if (num >= 50) return "Skillful";
    if (num >= 25) return "Intermediate";
    if (num >= 10) return "Beginner";
    return "";
};

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-3 page-break-inside-avoid">
        <h2 className="text-lg font-semibold text-[#4338CA] border-b pb-1 border-[#E5E7EB]">{title}</h2>
        <div>{children}</div>
    </section>
);

export const Entry = ({
    title, subtitle, city, startDate, endDate, description
}: {
    title: string; subtitle?: string; city?: string; startDate: string; endDate: string; description: string;
}) => (
    <div className="mb-5 page-break-inside-avoid">
        <div className="flex justify-between font-medium text-[#111827]">
            <span>{title}{subtitle && ` — ${subtitle}`}{city && `, ${city}`}</span>
            <span className="text-sm text-[#6B7280]">{startDate} – {endDate}</span>
        </div>
        <p className="text-[#374151]">{description}</p>
    </div>
);
