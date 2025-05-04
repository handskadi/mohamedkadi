"use client";
import { useCVStore } from "../../context/useCVStore";

export default function Template2() {
    const {
        personal, objective, experience, education, skills, languages, interests,
        references, courses, achievements, publications, customSections, hiddenSections
    } = useCVStore();

    const show = (key: string) => !hiddenSections.includes(key);

    const getLevelLabel = (val: string | number): string => {
        const num = parseInt(val as string);
        if (num >= 90) return "Expert";
        if (num >= 75) return "Experienced";
        if (num >= 50) return "Skillful";
        if (num >= 25) return "Intermediate";
        if (num >= 10) return "Beginner";
        return "";
    };

    return (
        <div className="max-w-[800px] mx-auto px-10 py-12 text-[#1f2937] font-serif text-[15px] leading-relaxed space-y-10 bg-white">
            {show("personal") && (
                <header className="border-b border-gray-300 pb-6 flex items-center gap-4">
                    {personal.photo && (
                        <img src={personal.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border shadow" />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold mb-1">{personal.firstName} {personal.lastName}</h1>
                        <p className="text-gray-600">{personal.email} · {personal.phone} · {personal.city}</p>
                    </div>
                </header>
            )}

            {show("objective") && objective && (
                <Section title="Summary">
                    <p>{objective}</p>
                </Section>
            )}

            {show("experience") && experience.length > 0 && (
                <Section title="Experience">
                    {experience.map((e, i) => (
                        <div key={i} className="mb-4">
                            <p className="font-bold">{e.title} — {e.company}</p>
                            <p className="text-sm text-gray-500">{e.startDate} – {e.endDate}</p>
                            <p>{e.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {show("education") && education.length > 0 && (
                <Section title="Education">
                    {education.map((e, i) => (
                        <div key={i} className="mb-4">
                            <p className="font-semibold">{e.degree} at {e.school}{e.city && ` — ${e.city}`}</p>
                            <p className="text-sm text-gray-500">{e.startDate} – {e.endDate}</p>
                            <p>{e.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {show("skills") && skills.length > 0 && (
                <Section title="Skills">
                    <ul className="list-disc list-inside grid grid-cols-2 gap-x-4 text-gray-700">
                        {skills.map((s, i) => (
                            <li key={i}>{s.name} {s.level && `— ${getLevelLabel(s.level)}`}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {show("languages") && languages.length > 0 && (
                <Section title="Languages">
                    <ul className="list-disc list-inside grid grid-cols-2 gap-x-4 text-gray-700">
                        {languages.map((l, i) => (
                            <li key={i}>{l.name} {l.level && `— ${getLevelLabel(l.level)}`}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {show("achievements") && achievements.length > 0 && (
                <Section title="Achievements">
                    <ul className="list-disc list-inside text-gray-700">
                        {achievements.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                </Section>
            )}

            {show("interests") && interests.length > 0 && (
                <Section title="Interests">
                    <ul className="list-disc list-inside text-gray-700">
                        {interests.map((i, idx) => <li key={idx}>{i.name}</li>)}
                    </ul>
                </Section>
            )}

            {show("references") && references.length > 0 && (
                <Section title="References">
                    {references.map((r, i) => (
                        <div key={i} className="mb-2">
                            <div className="font-medium">{r.person} — {r.company}</div>
                            <div className="text-sm text-gray-500">{r.email} · {r.phone}</div>
                        </div>
                    ))}
                </Section>
            )}

            {show("courses") && courses.length > 0 && (
                <Section title="Courses">
                    {courses.map((c, i) => (
                        <div key={i} className="mb-2">
                            <p className="font-semibold">{c.name} at {c.institution}</p>
                            <p className="text-sm text-gray-500">{c.start} – {c.end}</p>
                            <p>{c.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {show("publications") && publications.length > 0 && (
                <Section title="Publications">
                    <ul className="list-disc list-inside text-gray-700">
                        {publications.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                </Section>
            )}

            {show("custom") && customSections.length > 0 && (
                <Section title="Additional Info">
                    <ul className="list-disc list-inside text-gray-700">
                        {customSections.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </Section>
            )}
        </div>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-2">
        <h2 className="text-xl font-bold text-green-600 border-b border-gray-300 pb-1">{title}</h2>
        <div>{children}</div>
    </section>
);
