import { Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";

// Optional custom font
Font.register({
    family: "System",
    fonts: [
        {
            src: "/fonts/Inter_18pt-Regular.ttf",
            fontWeight: 400,
        },
        {
            src: "/fonts/Inter_18pt-SemiBold.ttf",
            fontWeight: 600,
        },
    ],
});

const styles = StyleSheet.create({
    container: {
        padding: 30,
        fontSize: 11,
        fontFamily: "System",
        color: "#1f2937",
        lineHeight: 1.6,
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 13,
        fontWeight: 600,
        color: "#10B981", // green-500
        marginBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        paddingBottom: 4,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    subtitle: {
        fontWeight: 600,
        marginBottom: 2,
    },
    small: {
        fontSize: 10,
        color: "#6B7280",
        marginBottom: 2,
    },
    bullet: {
        fontSize: 11,
        marginBottom: 2,
    },
    colList: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    colItem: {
        width: "50%",
        marginBottom: 2,
    },
});

const getLevelLabel = (val: string | number) => {
    const num = parseInt(val as string);
    if (num >= 90) return "Expert";
    if (num >= 75) return "Experienced";
    if (num >= 50) return "Skillful";
    if (num >= 25) return "Intermediate";
    if (num >= 10) return "Beginner";
    return "";
};

export default function Template2PDF() {
    const {
        personal, objective, experience, education, skills,
        languages, interests, references, courses, achievements,
        publications, customSections, hiddenSections
    } = useCVStore();

    const show = (key: string, list?: any[]) => {
        const hidden = hiddenSections.includes(key);
        if (list) return !hidden && list.length > 0;
        if (typeof key === "string") return !hidden && !!key;
        return !hidden;
    };

    return (
        <View style={styles.container}>
            {/* Personal */}
            {show("personal") && (
                <View style={styles.section} wrap={false}>
                    <View style={styles.row}>
                        {personal.photo && <Image src={personal.photo} style={styles.image} />}
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>{personal.firstName} {personal.lastName}</Text>
                            <Text style={styles.small}>{personal.email} · {personal.phone} · {personal.city}</Text>
                        </View>
                    </View>
                </View>
            )}

            {show("objective", [objective]) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Summary</Text>
                    <Text>{objective}</Text>
                </View>
            )}

            {show("experience", experience) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Experience</Text>
                    {experience.map((e, i) => (
                        <View key={i}>
                            <Text style={styles.subtitle}>{e.title} — {e.company}</Text>
                            <Text style={styles.small}>{e.startDate} – {e.endDate}</Text>
                            <Text>{e.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {show("education", education) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Education</Text>
                    {education.map((e, i) => (
                        <View key={i}>
                            <Text style={styles.subtitle}>{e.degree} at {e.school}{e.city && ` — ${e.city}`}</Text>
                            <Text style={styles.small}>{e.startDate} – {e.endDate}</Text>
                            <Text>{e.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {show("skills", skills) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Skills</Text>
                    <View style={styles.colList}>
                        {skills.map((s, i) => (
                            <Text key={i} style={styles.colItem}>
                                • {s.name} {s.level && `— ${getLevelLabel(s.level)}`}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {show("languages", languages) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Languages</Text>
                    <View style={styles.colList}>
                        {languages.map((l, i) => (
                            <Text key={i} style={styles.colItem}>
                                • {l.name} {l.level && `— ${getLevelLabel(l.level)}`}
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {show("achievements", achievements) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Achievements</Text>
                    {achievements.map((a, i) => <Text key={i} style={styles.bullet}>• {a}</Text>)}
                </View>
            )}

            {show("interests", interests) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Interests</Text>
                    {interests.map((i, idx) => (
                        <Text key={idx} style={styles.bullet}>• {i.name}</Text>
                    ))}
                </View>
            )}

            {show("references", references) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>References</Text>
                    {references.map((r, i) => (
                        <Text key={i} style={styles.bullet}>
                            {r.person} — {r.company}, {r.email} · {r.phone}
                        </Text>
                    ))}
                </View>
            )}

            {show("courses", courses) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Courses</Text>
                    {courses.map((c, i) => (
                        <View key={i}>
                            <Text style={styles.subtitle}>{c.name} at {c.institution}</Text>
                            <Text style={styles.small}>{c.start} – {c.end}</Text>
                            <Text>{c.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {show("publications", publications) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Publications</Text>
                    {publications.map((p, i) => (
                        <Text key={i} style={styles.bullet}>• {p}</Text>
                    ))}
                </View>
            )}

            {show("custom", customSections) && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Additional Info</Text>
                    {customSections.map((c, i) => (
                        <Text key={i} style={styles.bullet}>• {c}</Text>
                    ))}
                </View>
            )}
        </View>
    );
}
