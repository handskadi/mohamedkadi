import { Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";

// 1. Font Registration using your local Inter font (ensure these paths are valid)
Font.register({
    family: "Inter",
    fonts: [
        {
            src: "/fonts/Inter_24pt-Regular.ttf",
            fontWeight: 400,
        },
        {
            src: "/fonts/Inter_24pt-SemiBold.ttf",
            fontWeight: 600,
        },
    ],
});

// 2. Styles matching your browser preview
const styles = StyleSheet.create({
    container: {
        padding: 30,
        fontSize: 11,
        fontFamily: "Inter",
        color: "#111827",
        lineHeight: 1.6,
        width: "100%",
    },
    section: {
        marginBottom: 24,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    heading: {
        fontSize: 14,
        fontFamily: "Inter",
        fontWeight: 600,
        color: "#4338CA",
        marginBottom: 8,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    subtitle: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 12,
        marginBottom: 2,
    },
    small: {
        fontSize: 10,
        fontFamily: "Inter",
        color: "#6B7280",
        marginBottom: 4,
    },
    textBlock: {
        marginBottom: 8,
    },
    list2Col: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    bulletItem: {
        width: "50%",
        marginBottom: 2,
        fontFamily: "Inter",
    },
});

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

export default function Template1PDF() {
    const {
        personal, objective, experience, education, skills,
        languages, interests, references, courses, achievements,
        publications, customSections, hiddenSections,
    } = useCVStore();

    const show = (key: string, list?: any[]) => {
        const hidden = hiddenSections.includes(key);
        if (list) return !hidden && list.length > 0;
        if (typeof key === "string") return !hidden && !!key;
        return !hidden;
    };

    return (
        <View style={styles.container}>
            {/* Personal Info */}
            {show("personal") && (
                <View style={styles.section} wrap={false}>
                    <View style={styles.row}>
                        {personal.photo && <Image src={personal.photo} style={styles.image} />}
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>
                                {personal.firstName} {personal.lastName}
                            </Text>
                            <Text style={styles.small}>
                                {personal.email} · {personal.phone} · {personal.city}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Objective */}
            {show("objective", [objective]) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Professional Summary</Text>
                    <Text>{objective}</Text>
                </View>
            )}

            {/* Experience */}
            {show("experience", experience) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Work Experience</Text>
                    {experience.map((exp, idx) => (
                        <View key={idx} style={styles.textBlock}>
                            <Text style={styles.subtitle}>{exp.title} — {exp.company}</Text>
                            <Text style={styles.small}>{exp.startDate} – {exp.endDate}</Text>
                            <Text>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Education */}
            {show("education", education) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Education</Text>
                    {education.map((edu, idx) => (
                        <View key={idx} style={styles.textBlock}>
                            <Text style={styles.subtitle}>{edu.degree} at {edu.school}{edu.city && ` — ${edu.city}`}</Text>
                            <Text style={styles.small}>{edu.startDate} – {edu.endDate}</Text>
                            <Text>{edu.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Skills */}
            {show("skills", skills) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Skills</Text>
                    <View style={styles.list2Col}>
                        {skills.map((s, idx) => (
                            <Text key={idx} style={styles.bulletItem}>
                                • {s.name}{s.level && ` — ${getLevelLabel(s.level)}`}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {/* Languages */}
            {show("languages", languages) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Languages</Text>
                    <View style={styles.list2Col}>
                        {languages.map((l, idx) => (
                            <Text key={idx} style={styles.bulletItem}>
                                • {l.name}{l.level && ` — ${getLevelLabel(l.level)}`}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {/* Interests */}
            {show("interests", interests) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Interests</Text>
                    {interests.map((i, idx) => (
                        <Text key={idx}>• {i.name}</Text>
                    ))}
                </View>
            )}

            {/* References */}
            {show("references", references) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>References</Text>
                    {references.map((ref, idx) => (
                        <View key={idx} style={styles.textBlock}>
                            <Text style={styles.subtitle}>{ref.person} — {ref.company}</Text>
                            <Text style={styles.small}>{ref.email} · {ref.phone}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Courses */}
            {show("courses", courses) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Courses</Text>
                    {courses.map((c, idx) => (
                        <View key={idx} style={styles.textBlock}>
                            <Text style={styles.subtitle}>{c.name} at {c.institution}</Text>
                            <Text style={styles.small}>{c.start} – {c.end}</Text>
                            <Text>{c.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Achievements */}
            {show("achievements", achievements) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Achievements</Text>
                    {achievements.map((a, idx) => <Text key={idx}>• {a}</Text>)}
                </View>
            )}

            {/* Publications */}
            {show("publications", publications) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Publications</Text>
                    {publications.map((p, idx) => <Text key={idx}>• {p}</Text>)}
                </View>
            )}

            {/* Custom Sections */}
            {show("custom", customSections) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Additional Info</Text>
                    {customSections.map((c, idx) => <Text key={idx}>• {c}</Text>)}
                </View>
            )}
        </View>
    );
}
