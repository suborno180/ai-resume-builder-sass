// ============================================================
// Type definitions for the AI Resume Builder SaaS application
// ============================================================

/** Represents the current view/page of the application */
export type AppView =
  | 'landing'       // Landing page (default)
  | 'dashboard'     // Dashboard after login - shows user's resumes
  | 'ai-chat'       // AI Chat page - user describes the job they want
  | 'smart-form'    // Smart form - dynamic fields based on AI analysis
  | 'ai-polish'     // AI Enhancement page - AI polishes content for the job
  | 'templates'     // Template gallery
  | 'preview';      // Resume preview with A4 PDF export

/** User profile data */
export interface ProfileData {
  id?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

/** Work experience entry */
export interface ExperienceData {
  id?: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  order: number;
}

/** Education entry */
export interface EducationData {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
  order: number;
}

/** Skill entry */
export interface SkillData {
  id?: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'other';
  order: number;
}

/** Resume document */
export interface ResumeData {
  id?: string;
  title: string;
  templateId: string;
  targetJobTitle?: string;
  targetJobDescription?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Data for rendering a resume template */
export interface ResumeRenderData {
  profile: ProfileData | null;
  experiences: ExperienceData[];
  education: EducationData[];
  skills: SkillData[];
}

/** AI Job Analysis Result - what AI returns after analyzing the job description */
export interface AIJobAnalysis {
  jobTitle: string;
  industry: string;
  relevantSkills: Array<{ name: string; category: 'technical' | 'soft' | 'language' | 'other' }>;
  suggestedSections: string[];
  keyQualifications: string[];
  suggestedSummary: string;
  fieldRequirements: FieldRequirement[];
}

/** Dynamic field requirement - what fields AI says are needed for this job */
export interface FieldRequirement {
  section: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages' | 'volunteer';
  required: boolean;
  label: string;
  description?: string;
  placeholders?: string[];
}

/** AI Polished Resume Content */
export interface AIPolishedContent {
  summary: string;
  experienceBullets: Record<string, string[]>; // keyed by experience id
  skills: Array<{ name: string; category: string }>;
  suggestedTemplate: string;
  suggestedTemplateReason: string;
}

/** Chat message in the AI conversation */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
