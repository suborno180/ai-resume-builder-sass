// ============================================================
// Type definitions for the AI Resume Builder SaaS application
// ============================================================

/** Hash-based route paths */
export type AppRoute =
  | '/'           // Landing page
  | '/dashboard'  // Dashboard - shows user's resumes
  | '/chat'       // AI Chat - ChatGPT-like conversation
  | '/profile'    // Profile management
  | '/templates'  // Template gallery
  | '/resume';    // Resume preview with A4 PDF

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
  hobbies?: string;
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

/** AI Job Analysis Result */
export interface AIJobAnalysis {
  jobTitle: string;
  industry: string;
  relevantSkills: Array<{ name: string; category: 'technical' | 'soft' | 'language' | 'other' }>;
  suggestedSections: string[];
  keyQualifications: string[];
  suggestedSummary: string;
  fieldRequirements: FieldRequirement[];
}

/** Dynamic field requirement */
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
  experienceBullets: Record<string, string[]>;
  skills: Array<{ name: string; category: string }>;
  suggestedTemplate: string;
  suggestedTemplateReason: string;
}

/** Chat message with profile extraction data */
export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  /** Extracted profile fields that need user confirmation */
  extractedInfo?: ExtractedField[];
  /** Timestamp */
  createdAt?: string;
}

/** A single extracted field pending confirmation */
export interface ExtractedField {
  id: string;
  section: 'personal' | 'experience' | 'education' | 'skills' | 'summary' | 'hobbies';
  field: string;
  label: string;
  value: string | Record<string, string> | Record<string, string>[];
  status: 'pending' | 'confirmed' | 'rejected' | 'edited';
  /** The edited value if user modified it */
  editedValue?: string | Record<string, string> | Record<string, string>[];
}

/** Conversation summary for sidebar */
export interface ConversationSummary {
  id: string;
  title: string;
  targetJob: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  preview: string;
}

/** Profile update payload sent when user confirms extracted info */
export interface ProfileUpdatePayload {
  personal?: Partial<ProfileData>;
  summary?: string;
  experiences?: Omit<ExperienceData, 'id' | 'order'>[];
  education?: Omit<EducationData, 'id' | 'order'>[];
  skills?: Omit<SkillData, 'id' | 'order'>[];
}
