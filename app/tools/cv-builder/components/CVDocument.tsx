"use client";

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 35,
        fontFamily: "Helvetica",
        lineHeight: 1.5,
        color: "#111827",
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#4338CA",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 3,
    },
    text: {
        marginBottom: 4,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginBottom: 10,
    },
});

export default function CVDocument() {
    const {
        personal,
        objective,
        experience,
        education,
        skills,
        languages,
        interests,
        references,
        courses,
        achievements,
        publications,
        customSections,
        hiddenSections,
    } = useCVStore();

    const isVisible = (key: string) => !hiddenSections.includes(key);

    return (
        <Document title="my-resume">
            <Page size="A4" style={styles.page} wrap>
                {/* Personal Info */}
                {isVisible("personal") && (
                    <View style={styles.section}>
                        {personal.photo && <Image src={personal.photo} style={styles.image} />}
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {personal.firstName} {personal.lastName}
                        </Text>
                        <Text>{personal.email} · {personal.phone} · {personal.city}</Text>
                    </View>
                )}

                {/* Summary */}
                {isVisible("objective") && objective && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Professional Summary</Text>
                        <Text>{objective}</Text>
                    </View>
                )}

                {/* Experience */}
                {isVisible("experience") && experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Work Experience</Text>
                        {experience.map((exp, idx) => (
                            <View key={idx} style={styles.text}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {exp.title} — {exp.company}
                                </Text>
                                <Text>{exp.startDate} – {exp.endDate}</Text>
                                <Text>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {isVisible("education") && education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Education</Text>
                        {education.map((edu, idx) => (
                            <View key={idx} style={styles.text}>
                                <Text style={{ fontWeight: "bold" }}>
                                    {edu.degree} at {edu.school}
                                </Text>
                                <Text>{edu.startDate} – {edu.endDate}</Text>
                                <Text>{edu.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {isVisible("skills") && skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Skills</Text>
                        <Text>{skills.map((s) => s.name).join(" · ")}</Text>
                    </View>
                )}

                {/* Languages */}
                {isVisible("languages") && languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Languages</Text>
                        <Text>{languages.map((l) => l.name).join(" · ")}</Text>
                    </View>
                )}

                {/* Courses */}
                {isVisible("courses") && courses.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Courses</Text>
                        {courses.map((c, idx) => (
                            <View key={idx} style={styles.text}>
                                <Text style={{ fontWeight: "bold" }}>{c.name}</Text>
                                <Text>{c.institution}</Text>
                                <Text>{c.start} – {c.end}</Text>
                                <Text>{c.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Achievements */}
                {isVisible("achievements") && achievements.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Achievements</Text>
                        <Text>{achievements.join(" · ")}</Text>
                    </View>
                )}

                {/* Publications */}
                {isVisible("publications") && publications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Publications</Text>
                        <Text>{publications.join(" · ")}</Text>
                    </View>
                )}

                {/* Interests */}
                {isVisible("interests") && interests.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Interests</Text>
                        <Text>{interests.map((i) => i.name).join(" · ")}</Text>
                    </View>
                )}

                {/* References */}
                {isVisible("references") && references.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>References</Text>
                        {references.map((ref, idx) => (
                            <View key={idx} style={styles.text}>
                                <Text>{ref.person} — {ref.company}</Text>
                                <Text>{ref.email} · {ref.phone}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Custom Sections */}
                {isVisible("custom") && customSections.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Additional Information</Text>
                        <Text>{customSections.join(" · ")}</Text>
                    </View>
                )}
            </Page>
        </Document>
    );
}
