"use client";

import { useCVStore } from "../../context/useCVStore";

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
        <div className="text-gray-800 font-sans text-sm space-y-6">
            {/* Header */}
            {isVisible("personal") && (
                <div className="border-b pb-4 flex items-start gap-4">
                    {personal.photo && (
                        <img
                            src={personal.photo}
                            alt="Profile"
                            className="w-20 h-20 object-cover rounded-full border"
                        />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold">
                            {personal.firstName} {personal.lastName}
                        </h1>
                        <p className="text-gray-600">
                            {personal.email} · {personal.phone} · {personal.city}
                        </p>
                    </div>
                </div>
            )}

            {isVisible("objective") && objective && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Objective</h2>
                    <p>{objective}</p>
                </section>
            )}

            {isVisible("experience") && experience.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Work Experience</h2>
                    {experience.map((exp, idx) => (
                        <div key={idx} className="mb-3">
                            <p className="font-medium">
                                {exp.title} at {exp.employer} — {exp.city}
                            </p>
                            <p className="text-sm text-gray-500">
                                {exp.startDate} – {exp.endDate}
                            </p>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {isVisible("education") && education.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Education</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-3">
                            <p className="font-medium">
                                {edu.degree} at {edu.school} — {edu.city}
                            </p>
                            <p className="text-sm text-gray-500">
                                {edu.startDate} – {edu.endDate}
                            </p>
                            <p>{edu.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {isVisible("skills") && skills.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Skills</h2>
                    <ul className="list-disc list-inside">
                        {skills.map((s, idx) => (
                            <li key={idx}>
                                {s.name}
                                {s.level && ` — ${s.level}`}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {isVisible("languages") && languages.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Languages</h2>
                    <ul className="list-disc list-inside">
                        {languages.map((l, idx) => (
                            <li key={idx}>
                                {l.name}
                                {l.level && ` — ${l.level}`}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {isVisible("courses") && courses.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Courses</h2>
                    {courses.map((c, idx) => (
                        <div key={idx} className="mb-2">
                            <p className="font-medium">
                                {c.name} — {c.institution}
                            </p>
                            <p className="text-sm text-gray-500">
                                {c.start} – {c.end}
                            </p>
                            <p>{c.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {isVisible("publications") && publications.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Publications</h2>
                    <ul className="list-disc list-inside">
                        {publications.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {isVisible("achievements") && achievements.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Achievements</h2>
                    <ul className="list-disc list-inside">
                        {achievements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {isVisible("interests") && interests.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Interests</h2>
                    <ul className="list-disc list-inside">
                        {interests.map((item, idx) => (
                            <li key={idx}>{item.name}</li>
                        ))}
                    </ul>
                </section>
            )}

            {isVisible("references") && references.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">References</h2>
                    {references.map((ref, idx) => (
                        <div key={idx} className="mb-2">
                            <p className="font-medium">{ref.person} at {ref.company}</p>
                            <p className="text-sm text-gray-600">{ref.email} · {ref.phone}</p>
                        </div>
                    ))}
                </section>
            )}

            {isVisible("custom") && customSections.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-indigo-700 mb-1">Additional Notes</h2>
                    <ul className="list-disc list-inside">
                        {customSections.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
