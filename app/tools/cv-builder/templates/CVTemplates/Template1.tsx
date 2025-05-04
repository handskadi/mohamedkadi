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
        <div>
            {/* Page 1 */}
            <div className="a4-preview">
                {isVisible("personal") && (
                    <header className="border-b border-[#D1D5DB] pb-6 flex items-center gap-6 avoid-break">
                        {personal.photo && (
                            <img src={personal.photo} alt="Profile" className="w-24 h-24 object-cover rounded-full border shadow" />
                        )}
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-1">
                                {personal.firstName} {personal.lastName}
                            </h1>
                            <p className="text-[#4B5563]">{personal.email} · {personal.phone} · {personal.city}</p>
                        </div>
                    </header>
                )}

                {isVisible("objective") && objective && (
                    <Section title="Professional Summary">
                        <p>{objective}</p>
                    </Section>
                )}
            </div>

            {/* Page 2 */}
            <div className="a4-preview">
                {isVisible("experience") && (
                    <Section title="Work Experience">
                        {experience.map((exp, idx) => <Entry key={idx} {...exp} />)}
                    </Section>
                )}
            </div>

            {/* Page 3 */}
            <div className="a4-preview">
                {isVisible("education") && (
                    <Section title="Education">
                        {education.map((edu, idx) => (
                            <div key={idx} className="mb-3">
                                <p className="font-medium">{[edu.degree, edu.school].filter(Boolean).join(" at ")}{edu.city && ` — ${edu.city}`}</p>
                                <p className="text-sm text-[#6B7280]">{edu.startDate} – {edu.endDate}</p>
                                <p>{edu.description}</p>
                            </div>
                        ))}
                    </Section>
                )}
                {isVisible("skills") && (
                    <Section title="Skills">
                        <ul className="grid grid-cols-2 list-disc list-inside text-[#374151] gap-x-4">
                            {skills.map((s, idx) => (
                                <li key={idx}>{s.name}{s.level && ` — ${getLevelLabel(s.level)}`}</li>
                            ))}
                        </ul>
                    </Section>
                )}
            </div>

            {/* Page 4 */}
            <div className="a4-preview">
                {isVisible("languages") && (
                    <Section title="Languages">
                        <ul className="grid grid-cols-2 list-disc list-inside text-[#374151] gap-x-4">
                            {languages.map((l, idx) => (
                                <li key={idx}>{l.name}{l.level && ` — ${getLevelLabel(l.level)}`}</li>
                            ))}
                        </ul>
                    </Section>
                )}
                {isVisible("courses") && (
                    <Section title="Courses">
                        {courses.map((c, idx) => (
                            <Entry key={idx} title={c.name} subtitle={c.institution} startDate={c.start} endDate={c.end} description={c.description} />
                        ))}
                    </Section>
                )}
            </div>

            {/* Page 5 */}
            <div className="a4-preview">
                {isVisible("achievements") && (
                    <Section title="Achievements">
                        <ul className="list-disc list-inside text-[#374151]">
                            {achievements.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                    </Section>
                )}
                {isVisible("interests") && (
                    <Section title="Interests">
                        <ul className="list-disc list-inside text-[#374151]">
                            {interests.map((item, idx) => <li key={idx}>{item.name}</li>)}
                        </ul>
                    </Section>
                )}
                {isVisible("references") && (
                    <Section title="References">
                        {references.map((ref, idx) => (
                            <div key={idx} className="mb-3">
                                <div className="font-medium">{ref.person} — {ref.company}</div>
                                <div className="text-sm text-[#6B7280]">{ref.email} · {ref.phone}</div>
                            </div>
                        ))}
                    </Section>
                )}
                {isVisible("custom") && (
                    <Section title="Additional Information">
                        <ul className="list-disc list-inside text-[#374151]">
                            {customSections.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
    );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="space-y-3 avoid-break">
        <h2 className="text-lg font-semibold text-[#4338CA] border-b pb-1 border-[#E5E7EB]">{title}</h2>
        <div>{children}</div>
    </section>
);

const Entry = ({
    title, subtitle, city, startDate, endDate, description
}: {
    title: string; subtitle?: string; city?: string; startDate: string; endDate: string; description: string;
}) => (
    <div className="mb-5 avoid-break">
        <div className="flex justify-between font-medium text-[#111827]">
            <span>{title}{subtitle && ` — ${subtitle}`}{city && `, ${city}`}</span>
            <span className="text-sm text-[#6B7280]">{startDate} – {endDate}</span>
        </div>
        <p className="text-[#374151]">{description}</p>
    </div>
);
