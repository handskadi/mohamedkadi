"use client";

import { useCVStore } from "../../context/useCVStore";

// Convert numeric levels into readable labels
const getLevelLabel = (val: string | number): string => {
    const num = parseInt(val as string);
    const cefr: Record<number, string> = {
        120: "A1",
        130: "A2",
        140: "B1",
        160: "B2",
        180: "C1",
        200: "C2",
    };

    if (cefr[num]) return cefr[num];
    if (num >= 90) return "Expert";
    if (num >= 75) return "Experienced";
    if (num >= 50) return "Skillful";
    if (num >= 25) return "Intermediate";
    if (num >= 10) return "Beginner";
    return "";
};

export default function Template1() {
    const {
        personal,
        objective,
        experience,
        education,
        skills,
        interests,
        references,
        languages,
        courses,
        publications,
        achievements,
        customSections,
        hiddenSections,
    } = useCVStore();

    const isVisible = (sectionKey: string) => !hiddenSections.includes(sectionKey);

    return (
        <div className="max-w-[800px] mx-auto bg-white shadow-xl text-gray-900 font-sans text-[15px] leading-relaxed px-10 py-12 print:px-10 print:py-10 space-y-10">
            {/* Header */}
            {isVisible("personal") && (
                <header className="border-b border-gray-300 pb-6 flex items-center gap-6">
                    {personal.photo && (
                        <img
                            src={personal.photo}
                            alt="Profile"
                            className="w-24 h-24 object-cover rounded-full border shadow"
                        />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-1">
                            {personal.firstName} {personal.lastName}
                        </h1>
                        <p className="text-gray-600">
                            {personal.email} · {personal.phone} · {personal.city}
                        </p>
                    </div>
                </header>
            )}

            {/* Sections */}
            {isVisible("objective") && objective && (
                <Section title="Professional Summary">
                    <p>{objective}</p>
                </Section>
            )}

            {isVisible("experience") && experience.length > 0 && (
                <Section title="Work Experience">
                    {experience.map((exp, idx) => (
                        <Entry key={idx} {...exp} />
                    ))}
                </Section>
            )}

            {isVisible("education") && education.length > 0 && (
                <Section title="Education">
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-3">
                            <p className="font-medium">
                                {[edu.degree, edu.school].filter(Boolean).join(" at ")}
                                {edu.city && ` — ${edu.city}`}
                            </p>
                            <p className="text-sm text-gray-500">
                                {edu.startDate} – {edu.endDate}
                            </p>
                            <p>{edu.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {isVisible("skills") && skills.length > 0 && (
                <Section title="Skills">
                    <ul className="grid grid-cols-2 list-disc list-inside text-gray-800 gap-x-4">
                        {skills.map((s, idx) => (
                            <li key={idx}>
                                {s.name}
                                {s.level && ` — ${getLevelLabel(s.level)}`}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {isVisible("languages") && languages.length > 0 && (
                <Section title="Languages">
                    <ul className="grid grid-cols-2 list-disc list-inside text-gray-800 gap-x-4">
                        {languages.map((l, idx) => (
                            <li key={idx}>
                                {l.name}
                                {l.level && ` — ${getLevelLabel(l.level)}`}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {isVisible("courses") && courses.length > 0 && (
                <Section title="Courses">
                    {courses.map((c, idx) => (
                        <Entry key={idx} title={c.name} subtitle={c.institution} startDate={c.start} endDate={c.end} description={c.description} />
                    ))}
                </Section>
            )}

            {isVisible("publications") && publications.length > 0 && (
                <Section title="Publications">
                    <ul className="list-disc list-inside text-gray-800">
                        {publications.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </Section>
            )}

            {isVisible("achievements") && achievements.length > 0 && (
                <Section title="Achievements">
                    <ul className="list-disc list-inside text-gray-800">
                        {achievements.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </Section>
            )}

            {isVisible("interests") && interests.length > 0 && (
                <Section title="Interests">
                    <ul className="list-disc list-inside text-gray-800">
                        {interests.map((item, idx) => <li key={idx}>{item.name}</li>)}
                    </ul>
                </Section>
            )}

            {isVisible("references") && references.length > 0 && (
                <Section title="References">
                    {references.map((ref, idx) => (
                        <div key={idx} className="mb-3">
                            <div className="font-medium">{ref.person} — {ref.company}</div>
                            <div className="text-sm text-gray-500">{ref.email} · {ref.phone}</div>
                        </div>
                    ))}
                </Section>
            )}

            {isVisible("custom") && customSections.length > 0 && (
                <Section title="Additional Information">
                    <ul className="list-disc list-inside text-gray-800">
                        {customSections.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </Section>
            )}
        </div>
    );
}

// 📌 Section component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-3">
        <h2 className="text-lg font-semibold text-indigo-700 border-b pb-1 border-gray-200">
            {title}
        </h2>
        <div>{children}</div>
    </section>
);

// 📌 Entry block for jobs, education, courses, etc.
const Entry = ({
    title,
    subtitle,
    city,
    startDate,
    endDate,
    description
}: {
    title: string;
    subtitle?: string;
    city?: string;
    startDate: string;
    endDate: string;
    description: string;
}) => (
    <div className="mb-5">
        <div className="flex justify-between font-medium text-gray-900">
            <span>{title}{subtitle && ` — ${subtitle}`}{city && `, ${city}`}</span>
            <span className="text-sm text-gray-500">
                {startDate} – {endDate}
            </span>
        </div>
        <p className="text-gray-700">{description}</p>
    </div>
);
