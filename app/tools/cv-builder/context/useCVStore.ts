import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---------- TYPES ----------
type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  photo?: string | null;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  birthPlace?: string;
  license?: string;
  gender?: string;
  nationality?: string;
  maritalStatus?: string;
  linkedin?: string;
  website?: string;
};

type ExperienceItem = {
  title: string;
  city: string;
  company: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
};

type EducationItem = {
  degree: string;
  city: string;
  school: string;
  startDate: string;
  endDate: string;
  description: string;
};

type SkillItem = {
  name: string;
  level: string;
};

type InterestItem = {
  name: string;
};

type ReferenceItem = {
  company: string;
  person: string;
  phone: string;
  email: string;
};

// ---------- STORE ----------
type CVState = {
  personal: PersonalInfo;
  objective: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  interests: InterestItem[];
  references: ReferenceItem[];
  selectedTemplate: string;

  visibleSections: string[];
  hiddenSections: string[];
  reorderSections: (keys: string[]) => void;
  toggleSection: (key: string) => void;
  togglePreviewSection: (key: string) => void;

  languages: { name: string; level: string }[];
  addLanguage: () => void;
  updateLanguage: (
    i: number,
    key: keyof CVState["languages"][number],
    value: string
  ) => void;
  removeLanguage: (i: number) => void;

  courses: {
    name: string;
    institution: string;
    start: string;
    end: string;
    description: string;
  }[];
  addCourse: () => void;
  updateCourse: (
    i: number,
    key: keyof CVState["courses"][number],
    value: string
  ) => void;
  removeCourse: (i: number) => void;

  publications: string[];
  addPublication: () => void;
  updatePublication: (i: number, value: string) => void;
  removePublication: (i: number) => void;

  achievements: string[];
  addAchievement: () => void;
  updateAchievement: (i: number, value: string) => void;
  removeAchievement: (i: number) => void;

  customSections: string[];
  addCustomSection: () => void;
  updateCustomSection: (i: number, value: string) => void;
  removeCustomSection: (i: number) => void;

  updatePersonal: (key: keyof PersonalInfo, value: string) => void;
  setPersonalPhoto: (photo: string | null) => void;
  updateObjective: (value: string) => void;

  addExperience: () => void;
  updateExperience: (
    index: number,
    key: keyof ExperienceItem,
    value: string
  ) => void;
  removeExperience: (index: number) => void;

  addEducation: () => void;
  updateEducation: (
    index: number,
    key: keyof EducationItem,
    value: string
  ) => void;
  removeEducation: (index: number) => void;

  addSkill: () => void;
  updateSkill: (index: number, key: keyof SkillItem, value: string) => void;
  removeSkill: (index: number) => void;

  addInterest: () => void;
  updateInterest: (
    index: number,
    key: keyof InterestItem,
    value: string
  ) => void;
  removeInterest: (index: number) => void;

  addReference: () => void;
  updateReference: (
    index: number,
    key: keyof ReferenceItem,
    value: string
  ) => void;
  removeReference: (index: number) => void;

  setSelectedTemplate: (id: string) => void;
};

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      personal: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        photo: null,
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        birthPlace: "",
        license: "",
        gender: "",
        nationality: "",
        maritalStatus: "",
        linkedin: "",
        website: "",
      },
      objective: "",
      experience: [],
      education: [],
      skills: [],
      interests: [],
      references: [],
      selectedTemplate: "",
      visibleSections: [
        "objective",
        "experience",
        "education",
        "skills",
        "interests",
        "references",
      ],
      hiddenSections: [],

      reorderSections: (keys) => set(() => ({ visibleSections: keys })),
      toggleSection: (key) =>
        set((s) => ({
          visibleSections: s.visibleSections.includes(key)
            ? s.visibleSections.filter((k) => k !== key)
            : [...s.visibleSections, key],
        })),
      togglePreviewSection: (key) =>
        set((s) => ({
          hiddenSections: s.hiddenSections.includes(key)
            ? s.hiddenSections.filter((k) => k !== key)
            : [...s.hiddenSections, key],
        })),

      languages: [],
      addLanguage: () =>
        set((s) => ({ languages: [...s.languages, { name: "", level: "" }] })),
      updateLanguage: (i, key, value) =>
        set((s) => {
          const updated = [...s.languages];
          updated[i] = { ...updated[i], [key]: value };
          return { languages: updated };
        }),
      removeLanguage: (i) =>
        set((s) => ({ languages: s.languages.filter((_, idx) => idx !== i) })),

      courses: [],
      addCourse: () =>
        set((s) => ({
          courses: [
            ...s.courses,
            { name: "", institution: "", start: "", end: "", description: "" },
          ],
        })),
      updateCourse: (i, key, value) =>
        set((s) => {
          const updated = [...s.courses];
          updated[i] = { ...updated[i], [key]: value };
          return { courses: updated };
        }),
      removeCourse: (i) =>
        set((s) => ({ courses: s.courses.filter((_, idx) => idx !== i) })),

      publications: [],
      addPublication: () =>
        set((s) => ({ publications: [...s.publications, ""] })),
      updatePublication: (i, value) =>
        set((s) => {
          const updated = [...s.publications];
          updated[i] = value;
          return { publications: updated };
        }),
      removePublication: (i) =>
        set((s) => ({
          publications: s.publications.filter((_, idx) => idx !== i),
        })),

      achievements: [],
      addAchievement: () =>
        set((s) => ({ achievements: [...s.achievements, ""] })),
      updateAchievement: (i, value) =>
        set((s) => {
          const updated = [...s.achievements];
          updated[i] = value;
          return { achievements: updated };
        }),
      removeAchievement: (i) =>
        set((s) => ({
          achievements: s.achievements.filter((_, idx) => idx !== i),
        })),

      customSections: [],
      addCustomSection: () =>
        set((s) => ({ customSections: [...s.customSections, ""] })),
      updateCustomSection: (i, value) =>
        set((s) => {
          const updated = [...s.customSections];
          updated[i] = value;
          return { customSections: updated };
        }),
      removeCustomSection: (i) =>
        set((s) => ({
          customSections: s.customSections.filter((_, idx) => idx !== i),
        })),

      updatePersonal: (key, value) =>
        set((state) => ({
          personal: { ...state.personal, [key]: value },
        })),

      setPersonalPhoto: (photo) =>
        set((state) => ({
          personal: { ...state.personal, photo },
        })),

      updateObjective: (value) => set(() => ({ objective: value })),

      addExperience: () =>
        set((state) => ({
          experience: [
            ...state.experience,
            {
              title: "",
              city: "",
              employer: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
        })),
      updateExperience: (index, key, value) =>
        set((state) => {
          const updated = [...state.experience];
          updated[index] = { ...updated[index], [key]: value };
          return { experience: updated };
        }),
      removeExperience: (index) =>
        set((state) => ({
          experience: state.experience.filter((_, i) => i !== index),
        })),

      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            {
              degree: "",
              city: "",
              school: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
        })),
      updateEducation: (index, key, value) =>
        set((state) => {
          const updated = [...state.education];
          updated[index] = { ...updated[index], [key]: value };
          return { education: updated };
        }),
      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),

      addSkill: () =>
        set((state) => ({
          skills: [...state.skills, { name: "", level: "" }],
        })),
      updateSkill: (index, key, value) =>
        set((state) => {
          const updated = [...state.skills];
          updated[index] = { ...updated[index], [key]: value };
          return { skills: updated };
        }),
      removeSkill: (index) =>
        set((state) => ({
          skills: state.skills.filter((_, i) => i !== index),
        })),

      addInterest: () =>
        set((state) => ({
          interests: [...state.interests, { name: "" }],
        })),
      updateInterest: (index, key, value) =>
        set((state) => {
          const updated = [...state.interests];
          updated[index] = { ...updated[index], [key]: value };
          return { interests: updated };
        }),
      removeInterest: (index) =>
        set((state) => ({
          interests: state.interests.filter((_, i) => i !== index),
        })),

      addReference: () =>
        set((state) => ({
          references: [
            ...state.references,
            { company: "", person: "", phone: "", email: "" },
          ],
        })),
      updateReference: (index, key, value) =>
        set((state) => {
          const updated = [...state.references];
          updated[index] = { ...updated[index], [key]: value };
          return { references: updated };
        }),
      removeReference: (index) =>
        set((state) => ({
          references: state.references.filter((_, i) => i !== index),
        })),

      setSelectedTemplate: (id) => set(() => ({ selectedTemplate: id })),
    }),
    {
      name: "cv-storage",
    }
  )
);
