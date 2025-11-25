"use client";
import { useCVStore } from "../../context/useCVStore";

const labelLevel = (val: string | number): string => {
  const n = parseInt(val as string);
  const labels: Record<number, string> = {
    120: "A1",
    130: "A2",
    140: "B1",
    160: "B2",
    180: "C1",
    200: "C2",
  };
  if (labels[n]) return labels[n];
  if (n >= 90) return "Expert";
  if (n >= 75) return "Experienced";
  if (n >= 50) return "Skillful";
  if (n >= 25) return "Intermediate";
  if (n >= 10) return "Beginner";
  return "";
};

export default function Template2() {
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

  const show = (key: string, list?: any[]) => {
    const isHidden = hiddenSections.includes(key);
    if (list) return !isHidden && list.length > 0;
    return !isHidden;
  };

  return (
    <div style={{ display: "flex", fontFamily: "system-ui", fontSize: 15, color: "#111827" }}>
      {/* Left Sidebar */}
      <div
        style={{
          width: "35%",
          backgroundColor: "#0f766e",
          color: "white",
          padding: 24,
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {personal.photo && (
          <img
            src={personal.photo}
            alt="profile"
            style={{ width: 100, height: 100, borderRadius: "50%", marginBottom: 16 }}
          />
        )}
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
          {personal.firstName} {personal.lastName}
        </h2>
        <p style={{ fontSize: 13 }}>
          {personal.email} · {personal.phone} · {personal.city}
        </p>
        <p style={{ margin: "4px 0" }}>
          {personal.birthDay}/{personal.birthMonth}/{personal.birthYear} | {personal.maritalStatus}{" "}
          | {personal.nationality}
        </p>

        {show("skills", skills) && (
          <SidebarSection title="Skills">
            {skills.map((s, i) => (
              <li key={i}>
                • {s.name}
                {s.level && ` — ${labelLevel(s.level)}`}
              </li>
            ))}
          </SidebarSection>
        )}

        {show("languages", languages) && (
          <SidebarSection title="Languages">
            {languages.map((l, i) => (
              <li key={i}>
                • {l.name}
                {l.level && ` — ${labelLevel(l.level)}`}
              </li>
            ))}
          </SidebarSection>
        )}

        {show("interests", interests) && (
          <SidebarSection title="Interests">
            {interests.map((i, idx) => (
              <li key={idx}>• {i.name}</li>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: "65%", padding: 32 }}>
        {show("objective", [objective]) && (
          <MainSection title="Professional Summary">
            <p>{objective}</p>
          </MainSection>
        )}

        {show("experience", experience) && (
          <MainSection title="Work Experience">
            {experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>
                  {exp.title} — {exp.employer}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>
                  {exp.startDate} – {exp.endDate}
                </div>
                <p>{exp.description}</p>
              </div>
            ))}
          </MainSection>
        )}

        {show("education", education) && (
          <MainSection title="Education">
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>
                  {edu.degree} at {edu.school}
                  {edu.city && ` — ${edu.city}`}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>
                  {edu.startDate} – {edu.endDate}
                </div>
                <p>{edu.description}</p>
              </div>
            ))}
          </MainSection>
        )}

        {show("courses", courses) && (
          <MainSection title="Courses">
            {courses.map((c, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>
                  {c.name} at {c.institution}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>
                  {c.start} – {c.end}
                </div>
                <p>{c.description}</p>
              </div>
            ))}
          </MainSection>
        )}

        {show("references", references) && (
          <MainSection title="References">
            {references.map((ref, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>
                  {ref.person} — {ref.company}
                </div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>
                  {ref.email} · {ref.phone}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {show("achievements", achievements) && (
          <MainSection title="Achievements">
            <ul>
              {achievements.map((a, i) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>
          </MainSection>
        )}

        {show("publications", publications) && (
          <MainSection title="Publications">
            <ul>
              {publications.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </MainSection>
        )}

        {show("custom", customSections) && (
          <MainSection title="Additional Info">
            <ul>
              {customSections.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </MainSection>
        )}
      </div>
    </div>
  );
}

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginTop: 24 }}>
    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{title}</h3>
    <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: 14, lineHeight: 1.6 }}>{children}</ul>
  </div>
);

const MainSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 28 }}>
    <h2
      style={{
        fontSize: 18,
        fontWeight: 600,
        color: "#4338CA",
        borderBottom: "1px solid #E5E7EB",
        paddingBottom: 4,
        marginBottom: 12,
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);
