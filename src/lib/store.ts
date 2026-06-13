import { create } from 'zustand';
import type {
  AppView,
  ProfileData,
  ExperienceData,
  EducationData,
  SkillData,
  ResumeData,
  AIJobAnalysis,
  AIPolishedContent,
  ChatMessage,
} from '@/lib/types';

// ============================================================
// Application-wide Zustand store
// ============================================================

export interface AppState {
  // Navigation
  currentView: AppView;
  setView: (view: AppView) => void;

  // Auth dialog
  authDialogOpen: boolean;
  authMode: 'login' | 'signup';
  setAuthDialog: (open: boolean, mode?: 'login' | 'signup') => void;

  // Profile data (local cache)
  profile: ProfileData | null;
  setProfile: (profile: ProfileData | null) => void;

  // Experiences
  experiences: ExperienceData[];
  setExperiences: (experiences: ExperienceData[]) => void;
  addExperience: (experience: ExperienceData) => void;
  updateExperience: (id: string, experience: Partial<ExperienceData>) => void;
  removeExperience: (id: string) => void;

  // Education
  education: EducationData[];
  setEducation: (education: EducationData[]) => void;
  addEducation: (education: EducationData) => void;
  updateEducation: (id: string, education: Partial<EducationData>) => void;
  removeEducation: (id: string) => void;

  // Skills
  skills: SkillData[];
  setSkills: (skills: SkillData[]) => void;
  addSkill: (skill: SkillData) => void;
  removeSkill: (id: string) => void;

  // Resume
  currentResume: ResumeData | null;
  setCurrentResume: (resume: ResumeData | null) => void;
  resumes: ResumeData[];
  setResumes: (resumes: ResumeData[]) => void;

  // Selected template
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;

  // AI job analysis
  jobAnalysis: AIJobAnalysis | null;
  setJobAnalysis: (analysis: AIJobAnalysis | null) => void;
  targetJobDescription: string;
  setTargetJobDescription: (desc: string) => void;
  targetJobTitle: string;
  setTargetJobTitle: (title: string) => void;

  // AI Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;

  // AI Polish
  polishedContent: AIPolishedContent | null;
  setPolishedContent: (content: AIPolishedContent | null) => void;

  // AI loading
  aiLoading: boolean;
  setAiLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // ── Navigation ─────────────────────────────────────────────
  currentView: 'landing',
  setView: (view) => set({ currentView: view }),

  // ── Auth dialog ────────────────────────────────────────────
  authDialogOpen: false,
  authMode: 'login',
  setAuthDialog: (open, mode) =>
    set({
      authDialogOpen: open,
      ...(mode !== undefined ? { authMode: mode } : {}),
    }),

  // ── Profile ────────────────────────────────────────────────
  profile: null,
  setProfile: (profile) => set({ profile }),

  // ── Experiences ────────────────────────────────────────────
  experiences: [],
  setExperiences: (experiences) => set({ experiences }),
  addExperience: (experience) =>
    set((state) => ({ experiences: [...state.experiences, experience] })),
  updateExperience: (id, experience) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    })),
  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),

  // ── Education ──────────────────────────────────────────────
  education: [],
  setEducation: (education) => set({ education }),
  addEducation: (education) =>
    set((state) => ({ education: [...state.education, education] })),
  updateEducation: (id, education) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    })),
  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  // ── Skills ─────────────────────────────────────────────────
  skills: [],
  setSkills: (skills) => set({ skills }),
  addSkill: (skill) =>
    set((state) => ({ skills: [...state.skills, skill] })),
  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== id),
    })),

  // ── Resume ─────────────────────────────────────────────────
  currentResume: null,
  setCurrentResume: (resume) => set({ currentResume: resume }),
  resumes: [],
  setResumes: (resumes) => set({ resumes }),

  // ── Selected template ──────────────────────────────────────
  selectedTemplate: 'modern',
  setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),

  // ── AI Job Analysis ────────────────────────────────────────
  jobAnalysis: null,
  setJobAnalysis: (analysis) => set({ jobAnalysis: analysis }),
  targetJobDescription: '',
  setTargetJobDescription: (desc) => set({ targetJobDescription: desc }),
  targetJobTitle: '',
  setTargetJobTitle: (title) => set({ targetJobTitle: title }),

  // ── AI Chat ────────────────────────────────────────────────
  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  clearChat: () => set({ chatMessages: [] }),

  // ── AI Polish ──────────────────────────────────────────────
  polishedContent: null,
  setPolishedContent: (content) => set({ polishedContent: content }),

  // ── AI loading ─────────────────────────────────────────────
  aiLoading: false,
  setAiLoading: (loading) => set({ aiLoading: loading }),
}));
