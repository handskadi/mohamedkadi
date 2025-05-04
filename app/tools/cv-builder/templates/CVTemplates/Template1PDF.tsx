import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";

const styles = StyleSheet.create({
    container: {
        fontSize: 11,
        fontFamily: "Helvetica",
        color: "#111827",
        lineHeight: 1.5,
        width: "100%",
    },
    section: {
        marginBottom: 18,
    },
    heading: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4338CA",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 2,
        marginBottom: 6,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginBottom: 10,
    },
    block: {
        marginBottom: 5,
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
        personal, objective, experience, education, skills, languages,
        interests, references, courses, achievements, publications,
        customSections, hiddenSections
    } = useCVStore();

    const show = (key: string) => !hiddenSections.includes(key);

    return (
        <View style={styles.container}>
            {/* Personal */}
            {show("personal") && (
                <View style={styles.section} wrap={false}>
                    {personal.photo && <Image src={personal.photo} style={styles.image} />}
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {personal.firstName} {personal.lastName}
                    </Text>
                    <Text>{personal.email} · {personal.phone} · {personal.city}</Text>
                </View>
            )}

            {show("objective") && objective && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Professional Summary</Text>
                    <Text>{objective}</Text>
                </View>
            )}

            {show("experience") && experience.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Work Experience</Text>
                    {experience.map((exp, idx) => (
                        <View key={idx} style={styles.block}>
                            <Text style={{ fontWeight: "bold" }}>{exp.title} — {exp.company}</Text>
                            <Text>{exp.startDate} – {exp.endDate}</Text>
                            <Text>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {show("education") && education.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Education</Text>
                    {education.map((edu, idx) => (
                        <View key={idx} style={styles.block}>
                            <Text style={{ fontWeight: "bold" }}>{edu.degree} at {edu.school}</Text>
                            <Text>{edu.startDate} – {edu.endDate}</Text>
                            <Text>{edu.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {show("skills") && skills.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Skills</Text>
                    {skills.map((s, idx) => (
                        <Text key={idx}>{s.name} {s.level && `— ${getLevelLabel(s.level)}`}</Text>
                    ))}
                </View>
            )}

            {show("languages") && languages.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Languages</Text>
                    {languages.map((l, idx) => (
                        <Text key={idx}>{l.name} {l.level && `— ${getLevelLabel(l.level)}`}</Text>
                    ))}
                </View>
            )}

            {show("interests") && interests.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Interests</Text>
                    {interests.map((i, idx) => <Text key={idx}>• {i.name}</Text>)}
                </View>
            )}

            {show("references") && references.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>References</Text>
                    {references.map((ref, idx) => (
                        <Text key={idx}>{ref.person} — {ref.company}, {ref.email} · {ref.phone}</Text>
                    ))}
                </View>
            )}

            {show("courses") && courses.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Courses</Text>
                    {courses.map((c, idx) => (
                        <Text key={idx}>{c.name} at {c.institution} ({c.start} – {c.end})</Text>
                    ))}
                </View>
            )}

            {show("achievements") && achievements.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Achievements</Text>
                    {achievements.map((a, idx) => <Text key={idx}>• {a}</Text>)}
                </View>
            )}

            {show("publications") && publications.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Publications</Text>
                    {publications.map((p, idx) => <Text key={idx}>• {p}</Text>)}
                </View>
            )}

            {show("custom") && customSections.length > 0 && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.heading}>Additional Info</Text>
                    {customSections.map((c, idx) => <Text key={idx}>• {c}</Text>)}
                </View>
            )}
        </View>
    );
}
