"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Plus, GripVertical } from "lucide-react";
import Link from "next/link";
import { useCVStore } from "../context/useCVStore";
import StepHeader from "../components/StepHeader"; // adjust path accordingly

// 🔒 Section metadata
const sectionMeta: Record<string, { icon: string; title: string }> = {
  objective: { icon: "📝", title: "Resume Objective" },
  experience: { icon: "💼", title: "Work Experience" },
  education: { icon: "🎓", title: "Education" },
  skills: { icon: "🛠️", title: "Skills" },
  interests: { icon: "💡", title: "Interests" },
  references: { icon: "📇", title: "References" },
  languages: { icon: "🌐", title: "Languages" },
  courses: { icon: "📘", title: "Courses" },
  publications: { icon: "📰", title: "Publications" },
  achievements: { icon: "🏆", title: "Achievements" },
  custom: { icon: "✍️", title: "Custom Section" },
};

// 🎯 All sections included in drag/hide logic
const allSectionKeys = Object.keys(sectionMeta);

export default function ExperiencesPage() {
  const {
    // store hooks
    // objective,
    // updateObjective,
    // experience,
    // addExperience,
    // updateExperience,
    // removeExperience,
    // education,
    // addEducation,
    // updateEducation,
    // removeEducation,
    // skills,
    // addSkill,
    // updateSkill,
    // removeSkill,
    // interests,
    // addInterest,
    // updateInterest,
    // removeInterest,
    // references,
    // addReference,
    // updateReference,
    // removeReference,
    languages,
    addLanguage,
    // updateLanguage,
    // removeLanguage,
    courses,
    addCourse,
    // updateCourse,
    // removeCourse,
    publications,
    addPublication,
    // updatePublication,
    // removePublication,
    achievements,
    addAchievement,
    // updateAchievement,
    // removeAchievement,
    customSections,
    addCustomSection,
    // updateCustomSection,
    // removeCustomSection,

    visibleSections,
    toggleSection,
    reorderSections,
  } = useCVStore();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const init: Record<string, boolean> = {};
    visibleSections.forEach(k => {
      init[k] = true;
      if (k === "languages" && languages.length === 0) addLanguage();
      if (k === "courses" && courses.length === 0) addCourse();
      if (k === "publications" && publications.length === 0) addPublication();
      if (k === "achievements" && achievements.length === 0) addAchievement();
      if (k === "custom" && customSections.length === 0) addCustomSection();
    });
    if (!visibleSections.includes("objective")) toggleSection("objective");
    if (!visibleSections.includes("experience")) toggleSection("experience");
    if (!visibleSections.includes("education")) toggleSection("education");
    if (!visibleSections.includes("skills")) toggleSection("skills");
    if (!visibleSections.includes("interests")) toggleSection("interests");
    if (!visibleSections.includes("references")) toggleSection("references");

    setExpanded(init);
  }, [
    achievements.length,
    addAchievement,
    addCourse,
    addCustomSection,
    addLanguage,
    addPublication,
    courses.length,
    customSections.length,
    languages.length,
    publications.length,
    toggleSection,
    visibleSections,
  ]);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = visibleSections.indexOf(active.id);
      const newIndex = visibleSections.indexOf(over.id);
      reorderSections(arrayMove(visibleSections, oldIndex, newIndex));
    }
  };

  const addAndShowSection = (key: string) => {
    if (!visibleSections.includes(key)) toggleSection(key);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 mt-[80px]">
      {/* Header */}
      <StepHeader title="My experiences" currentStep={2} />
      <div className="max-w-4xl mx-auto bg-white mt-[-20px] p-6 rounded-md shadow-sm space-y-6">
        {/* DND */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={visibleSections} strategy={verticalListSortingStrategy}>
            {visibleSections.map(key => (
              <SortableItem
                key={key}
                id={key}
                sectionKey={key}
                expanded={expanded[key]}
                onToggle={() => toggle(key)}
                onClose={() => toggleSection(key)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add Section Dropdown */}
        <select
          className="input mt-6"
          onChange={e => {
            if (e.target.value) addAndShowSection(e.target.value);
            e.target.value = "";
          }}
        >
          <option value="">+ Add extra section</option>
          {allSectionKeys
            .filter(key => !visibleSections.includes(key))
            .map(key => (
              <option key={key} value={key}>
                {sectionMeta[key].title}
              </option>
            ))}
        </select>

        {/* Footer */}
        <div className="text-center pt-8">
          <Link href="/tools/cv-builder/templates">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-semibold">
              Next step →
            </button>
          </Link>
        </div>
        <div className="text-center pt-2">
          <Link href="/tools/cv-builder/personal-details">
            <button className="text-gray-400 hover:text-gray-600 font-semibold text-sm cursor-pointer">
              <span className="flex items-center justify-center ">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous step
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SortableItem({
  id,
  sectionKey,
  expanded,
  onToggle,
  onClose,
}: {
  id: string;
  sectionKey: string;
  expanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    objective,
    updateObjective,
    experience,
    updateExperience,
    removeExperience,
    addExperience,
    education,
    updateEducation,
    removeEducation,
    addEducation,
    skills,
    updateSkill,
    removeSkill,
    addSkill,
    interests,
    updateInterest,
    removeInterest,
    addInterest,
    references,
    updateReference,
    removeReference,
    addReference,
    languages,
    updateLanguage,
    removeLanguage,
    addLanguage,
    courses,
    updateCourse,
    removeCourse,
    addCourse,
    publications,
    updatePublication,
    removePublication,
    addPublication,
    achievements,
    updateAchievement,
    removeAchievement,
    addAchievement,
    customSections,
    updateCustomSection,
    removeCustomSection,
    addCustomSection,
  } = useCVStore();

  return (
    <div ref={setNodeRef} style={style}>
      <div className="border rounded shadow-sm mb-6 bg-white">
        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center font-semibold">
            <GripVertical className="cursor-grab" {...attributes} {...listeners} />
            <span>{sectionMeta[sectionKey]?.icon}</span>
            <span>{sectionMeta[sectionKey]?.title}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <button onClick={onClose}>🗙</button>
            <button onClick={onToggle}>{expanded ? "−" : "+"}</button>
          </div>
        </div>

        {expanded && (
          <div className="p-4 space-y-4">
            {sectionKey === "objective" && (
              <TextArea label="Description" value={objective} onChange={updateObjective} />
            )}
            {sectionKey === "experience" &&
              experience.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeExperience(i)}>
                  <Input
                    label="Job title"
                    value={item.title}
                    onChange={v => updateExperience(i, "title", v)}
                  />
                  <Input
                    label="City"
                    value={item.city}
                    onChange={v => updateExperience(i, "city", v)}
                  />
                  <Input
                    label="Employer"
                    value={item.employer}
                    onChange={v => updateExperience(i, "employer", v)}
                  />
                  <Input
                    label="Start date"
                    value={item.startDate}
                    onChange={v => updateExperience(i, "startDate", v)}
                  />
                  <Input
                    label="End date"
                    value={item.endDate}
                    onChange={v => updateExperience(i, "endDate", v)}
                  />
                  <TextArea
                    label="Description"
                    value={item.description}
                    onChange={v => updateExperience(i, "description", v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "experience" && (
              <AddButton onClick={addExperience} label="Add experience" />
            )}

            {sectionKey === "education" &&
              education.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeEducation(i)}>
                  <Input
                    label="Degree"
                    value={item.degree}
                    onChange={v => updateEducation(i, "degree", v)}
                  />
                  <Input
                    label="City"
                    value={item.city}
                    onChange={v => updateEducation(i, "city", v)}
                  />
                  <Input
                    label="School"
                    value={item.school}
                    onChange={v => updateEducation(i, "school", v)}
                  />
                  <Input
                    label="Start"
                    value={item.startDate}
                    onChange={v => updateEducation(i, "startDate", v)}
                  />
                  <Input
                    label="End"
                    value={item.endDate}
                    onChange={v => updateEducation(i, "endDate", v)}
                  />
                  <TextArea
                    label="Description"
                    value={item.description}
                    onChange={v => updateEducation(i, "description", v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "education" && (
              <AddButton onClick={addEducation} label="Add education" />
            )}

            {sectionKey === "skills" &&
              skills.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeSkill(i)}>
                  <Input
                    label="Skill"
                    value={item.name}
                    onChange={v => updateSkill(i, "name", v)}
                  />
                  <select
                    // className="form-select-custom"
                    className="w-[95%] border border-gray-300 rounded px-3 py-2 text-sm"
                    name={`skill.items[${i}].level`}
                    value={item.level}
                    onChange={e => updateSkill(i, "level", e.target.value)}
                  >
                    <option value="0">Select level</option>
                    <option value="100">Expert</option>
                    <option value="75">Experienced</option>
                    <option value="50">Skilfull</option>
                    <option value="25">Intermediate</option>
                    <option value="20">Beginner</option>
                  </select>
                </EntryBlock>
              ))}
            {sectionKey === "skills" && <AddButton onClick={addSkill} label="Add skill" />}

            {sectionKey === "interests" &&
              interests.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeInterest(i)}>
                  <Input
                    label="Interest"
                    value={item.name}
                    onChange={v => updateInterest(i, "name", v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "interests" && <AddButton onClick={addInterest} label="Add interest" />}

            {sectionKey === "references" &&
              references.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeReference(i)}>
                  <Input
                    label="Company"
                    value={item.company}
                    onChange={v => updateReference(i, "company", v)}
                  />
                  <Input
                    label="Person"
                    value={item.person}
                    onChange={v => updateReference(i, "person", v)}
                  />
                  <Input
                    label="Phone"
                    value={item.phone}
                    onChange={v => updateReference(i, "phone", v)}
                  />
                  <Input
                    label="Email"
                    value={item.email}
                    onChange={v => updateReference(i, "email", v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "references" && (
              <AddButton onClick={addReference} label="Add reference" />
            )}

            {sectionKey === "languages" &&
              languages.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeLanguage(i)}>
                  <Input
                    label="Language"
                    value={item.name}
                    onChange={v => updateLanguage(i, "name", v)}
                  />
                  <select
                    // className="form-select-custom"
                    className="w-[95%] border border-gray-300 rounded px-3 py-2 text-sm"
                    name={`language.items[${i}].level`}
                    value={item.level}
                    onChange={e => updateLanguage(i, "level", e.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="100">Native speaker</option>
                    <option value="75">Highly proficient in speaking and writing</option>
                    <option value="50">Very good command</option>
                    <option value="25">Good working knowledge</option>
                    <option value="20">Working knowledge</option>
                    <option value="120">A1</option>
                    <option value="130">A2</option>
                    <option value="140">B1</option>
                    <option value="160">B2</option>
                    <option value="180">C1</option>
                    <option value="200">C2</option>
                  </select>
                </EntryBlock>
              ))}
            {sectionKey === "languages" && <AddButton onClick={addLanguage} label="Add language" />}

            {sectionKey === "courses" &&
              courses.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeCourse(i)}>
                  <Input
                    label="Course"
                    value={item.name}
                    onChange={v => updateCourse(i, "name", v)}
                  />
                  <Input
                    label="Institution"
                    value={item.institution}
                    onChange={v => updateCourse(i, "institution", v)}
                  />
                  <Input
                    label="Start"
                    value={item.start}
                    onChange={v => updateCourse(i, "start", v)}
                  />
                  <Input label="End" value={item.end} onChange={v => updateCourse(i, "end", v)} />
                  <TextArea
                    label="Description"
                    value={item.description}
                    onChange={v => updateCourse(i, "description", v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "courses" && <AddButton onClick={addCourse} label="Add course" />}

            {sectionKey === "publications" &&
              publications.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removePublication(i)}>
                  <TextArea
                    label="Description"
                    value={item}
                    onChange={v => updatePublication(i, v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "publications" && (
              <AddButton onClick={addPublication} label="Add publication" />
            )}

            {sectionKey === "achievements" &&
              achievements.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeAchievement(i)}>
                  <TextArea
                    label="Description"
                    value={item}
                    onChange={v => updateAchievement(i, v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "achievements" && (
              <AddButton onClick={addAchievement} label="Add achievement" />
            )}

            {sectionKey === "custom" &&
              customSections.map((item, i) => (
                <EntryBlock key={i} onRemove={() => removeCustomSection(i)}>
                  <TextArea
                    label="Description"
                    value={item}
                    onChange={v => updateCustomSection(i, v)}
                  />
                </EntryBlock>
              ))}
            {sectionKey === "custom" && (
              <AddButton onClick={addCustomSection} label="Add custom section" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 🎨 UI Components
const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <input
    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
    placeholder={label}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

const TextArea = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <textarea
    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
    placeholder={label}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
  >
    <Plus size={16} /> {label}
  </button>
);

const EntryBlock = ({ children, onRemove }: { children: any; onRemove: () => void }) => (
  <div className="border p-4 rounded relative bg-white shadow-sm">
    <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    <button onClick={onRemove} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
      <Trash2 size={18} />
    </button>
  </div>
);

const StepCircle = ({ step, label, done = false, active = false }: any) => (
  <div
    className={`flex items-center gap-1 ${done ? "opacity-100" : active ? "opacity-90" : "opacity-60"}`}
  >
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${active ? "bg-white text-green-600" : "border-2 border-white text-white"}`}
    >
      {step}
    </div>
    <span>{label}</span>
  </div>
);
