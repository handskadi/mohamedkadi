import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { useCVStore } from "@/app/tools/cv-builder/context/useCVStore";

const styles = StyleSheet.create({
  pageWrapper: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#111827",
    width: "100%",
  },
  sidebar: {
    width: "35%",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    padding: 24,
    paddingTop: 40,
    minHeight: "100%",
  },
  main: {
    width: "65%",
    padding: 32,
    paddingTop: 40,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 4,
    color: "white",
  },
  contact: {
    fontSize: 12,
    marginBottom: 12,
    color: "white",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "#4338CA",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
    marginBottom: 12,
  },
  subheading: {
    fontWeight: 600,
    marginBottom: 2,
  },
  muted: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },
  section: {
    marginBottom: 28,
  },
  list: {
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 3,
  },
  listItem: {
    marginBottom: 3,
  },
  small: {
    fontSize: 11,
    color: "#ffffff",
    marginBottom: 8,
  },
});

const getLevelLabel = (val: string | number): string => {
  const num = parseInt(val as string);
  const labels: Record<number, string> = {
    120: "A1",
    130: "A2",
    140: "B1",
    160: "B2",
    180: "C1",
    200: "C2",
  };
  if (labels[num]) return labels[num];
  if (num >= 90) return "Expert";
  if (num >= 75) return "Experienced";
  if (num >= 50) return "Skillful";
  if (num >= 25) return "Intermediate";
  if (num >= 10) return "Beginner";
  return "";
};

export default function Template2PDF() {
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
    achievements,
    publications,
    customSections,
    hiddenSections,
  } = useCVStore();

  const show = (key: string, list?: any[]) => {
    const isHidden = hiddenSections.includes(key);
    if (list) return !isHidden && list.length > 0;
    return !isHidden;
  };

  return (
    <View style={styles.pageWrapper}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* eslint-disable jsx-a11y/alt-text */}
        {personal.photo && <Image src={personal.photo} style={styles.photo} />}
        <Text style={styles.name}>
          {personal.firstName} {personal.lastName}
        </Text>
        <Text style={styles.contact}>
          {personal.email} · {personal.phone} · {personal.city}
        </Text>
        <Text style={styles.small}>
          {(personal.birthDay ?? "").padStart(2, "0")}/
          {(personal.birthMonth ?? "").padStart(2, "0")}/{personal.birthYear ?? ""} |{" "}
          {personal.maritalStatus ?? ""} | {personal.nationality ?? ""}
        </Text>
        {show("skills", skills) && (
          <SidebarSection title="Skills">
            {skills.map((s, i) => (
              <Text key={i} style={styles.listItem}>
                • {s.name}
                {s.level && ` — ${getLevelLabel(s.level)}`}
              </Text>
            ))}
          </SidebarSection>
        )}
        {show("languages", languages) && (
          <SidebarSection title="Languages">
            {languages.map((l, i) => (
              <Text key={i} style={styles.listItem}>
                • {l.name}
                {l.level && ` — ${getLevelLabel(l.level)}`}
              </Text>
            ))}
          </SidebarSection>
        )}
        {show("interests", interests) && (
          <SidebarSection title="Interests">
            {interests.map((i, idx) => (
              <Text key={idx} style={styles.listItem}>
                • {i.name}
              </Text>
            ))}
          </SidebarSection>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {show("objective", [objective]) && (
          <MainSection title="Professional Summary">
            <Text>{objective}</Text>
          </MainSection>
        )}

        {show("experience", experience) && (
          <MainSection title="Work Experience">
            {experience.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.subheading}>
                  {exp.title} — {exp.company}
                </Text>
                <Text style={styles.muted}>
                  {exp.startDate} – {exp.endDate}
                </Text>
                <Text>{exp.description}</Text>
              </View>
            ))}
          </MainSection>
        )}

        {show("education", education) && (
          <MainSection title="Education">
            {education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.subheading}>
                  {edu.degree} at {edu.school}
                  {edu.city && ` — ${edu.city}`}
                </Text>
                <Text style={styles.muted}>
                  {edu.startDate} – {edu.endDate}
                </Text>
                <Text>{edu.description}</Text>
              </View>
            ))}
          </MainSection>
        )}

        {show("courses", courses) && (
          <MainSection title="Courses">
            {courses.map((c, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.subheading}>
                  {c.name} at {c.institution}
                </Text>
                <Text style={styles.muted}>
                  {c.start} – {c.end}
                </Text>
                <Text>{c.description}</Text>
              </View>
            ))}
          </MainSection>
        )}

        {show("references", references) && (
          <MainSection title="References">
            {references.map((r, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={styles.subheading}>
                  {r.person} — {r.company}
                </Text>
                <Text style={styles.muted}>
                  {r.email} · {r.phone}
                </Text>
              </View>
            ))}
          </MainSection>
        )}

        {show("achievements", achievements) && (
          <MainSection title="Achievements">
            {achievements.map((a, idx) => (
              <Text key={idx}>• {a}</Text>
            ))}
          </MainSection>
        )}

        {show("publications", publications) && (
          <MainSection title="Publications">
            {publications.map((p, idx) => (
              <Text key={idx}>• {p}</Text>
            ))}
          </MainSection>
        )}

        {show("custom", customSections) && (
          <MainSection title="Additional Info">
            {customSections.map((c, idx) => (
              <Text key={idx}>• {c}</Text>
            ))}
          </MainSection>
        )}
      </View>
    </View>
  );
}

// Components — now with wrap={false}
const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ marginTop: 24 }} wrap={false}>
    <Text style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{title}</Text>
    <View>{children}</View>
  </View>
);

const MainSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.heading}>{title}</Text>
    <View>{children}</View>
  </View>
);
