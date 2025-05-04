"use client";
import { useCVStore } from "../../context/useCVStore";

const getLevelLabel = (val: string | number): string => {
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

export default function Template1() {
    const {
        personal, objective, experience, education, skills, interests, references,
        languages, courses, publications, achievements, customSections, hiddenSections
    } = useCVStore();

    const isVisible = (key: string) => !hiddenSections.includes(key);

    return (
        <div className="max-w-[800px] mx-auto px-10 py-12 text-[#111827] font-sans text-[15px] leading-relaxed space-y-10 bg-white">
            {isVisible("personal") && (
                <header className="border-b border-gray-300 pb-6 flex items-center gap-6">
                    {personal.photo && (
                        <img src={personal.photo} alt="Profile" className="w-24 h-24 object-cover rounded-full border shadow" />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-1">{personal.firstName} {personal.lastName}</h1>
                        <p className="text-gray-600">{personal.email} · {personal.phone} · {personal.city}</p>
                    </div>
                </header>
            )}

            {isVisible("objective") && objective && (
                <Section title="Professional Summary">
                    <p>{objective}</p>
                </Section>
            )}

            {isVisible("experience") && experience.length > 0 && (
                <Section title="Work Experience">
                    {experience.map((exp, idx) => (
                        <div key={idx} className="mb-4">
                            <p className="font-semibold">{exp.title} — {exp.company}</p>
                            <p className="text-sm text-gray-500">{exp.startDate} – {exp.endDate}</p>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {isVisible("education") && education.length > 0 && (
                <Section title="Education">
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-4">
                            <p className="font-semibold">{edu.degree} at {edu.school}{edu.city && ` — ${edu.city}`}</p>
                            <p className="text-sm text-gray-500">{edu.startDate} – {edu.endDate}</p>
                            <p>{edu.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {isVisible("skills") && skills.length > 0 && (
                <Section title="Skills">
                    <ul className="grid grid-cols-2 list-disc list-inside text-[#374151] gap-x-4">
                        {skills.map((s, idx) => (
                            <li key={idx}>{s.name}{s.level && ` — ${getLevelLabel(s.level)}`}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {isVisible("languages") && languages.length > 0 && (
                <Section title="Languages">
                    <ul className="grid grid-cols-2 list-disc list-inside text-[#374151] gap-x-4">
                        {languages.map((l, idx) => (
                            <li key={idx}>{l.name}{l.level && ` — ${getLevelLabel(l.level)}`}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {isVisible("interests") && interests.length > 0 && (
                <Section title="Interests">
                    <ul className="list-disc list-inside text-[#374151]">
                        {interests.map((i, idx) => <li key={idx}>{i.name}</li>)}
                    </ul>
                </Section>
            )}

            {isVisible("references") && references.length > 0 && (
                <Section title="References">
                    {references.map((ref, idx) => (
                        <div key={idx} className="mb-3">
                            <div className="font-medium">{ref.person} — {ref.company}</div>
                            <div className="text-sm text-[#6B7280]">{ref.email} · {ref.phone}</div>
                        </div>
                    ))}
                </Section>
            )}

            {isVisible("courses") && courses.length > 0 && (
                <Section title="Courses">
                    {courses.map((c, idx) => (
                        <div key={idx}>
                            <p className="font-semibold">{c.name} at {c.institution}</p>
                            <p className="text-sm text-gray-500">{c.start} – {c.end}</p>
                            <p>{c.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {isVisible("achievements") && achievements.length > 0 && (
                <Section title="Achievements">
                    <ul className="list-disc list-inside text-[#374151]">
                        {achievements.map((a, idx) => <li key={idx}>{a}</li>)}
                    </ul>
                </Section>
            )}

            {isVisible("publications") && publications.length > 0 && (
                <Section title="Publications">
                    <ul className="list-disc list-inside text-[#374151]">
                        {publications.map((p, idx) => <li key={idx}>{p}</li>)}
                    </ul>
                </Section>
            )}

            {isVisible("custom") && customSections.length > 0 && (
                <Section title="Additional Info">
                    <ul className="list-disc list-inside text-[#374151]">
                        {customSections.map((c, idx) => <li key={idx}>{c}</li>)}
                    </ul>
                </Section>
            )}
        </div>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-3">
        <h2 className="text-lg font-semibold text-indigo-700 border-b pb-1 border-gray-200">{title}</h2>
        <div>{children}</div>
    </section>
);
