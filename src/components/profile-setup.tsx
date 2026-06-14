'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Briefcase,
  GraduationCap,
  User,
  FileText,
  Lightbulb,
} from 'lucide-react';
import type { ExperienceData, EducationData, SkillData, ProfileData } from '@/lib/types';

// ── Step definitions ──────────────────────────────────────────
const STEPS = [
  { label: 'Personal Info', icon: User },
  { label: 'Summary', icon: FileText },
  { label: 'Experience & Education', icon: Briefcase },
  { label: 'Skills', icon: Lightbulb },
] as const;

// ── Animation variants ────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// ── Empty form state helpers ──────────────────────────────────
const emptyExperience = (): ExperienceData => ({
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  order: 0,
});

const emptyEducation = (): EducationData => ({
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
  description: '',
  order: 0,
});

// ==============================================================
// Main ProfileSetup Component
// ==============================================================
export function ProfileSetup() {
  const { data: session } = useSession();

  // Store state
  const {
    profile,
    setProfile,
    experiences,
    setExperiences,
    addExperience: addExperienceStore,
    updateExperience: updateExperienceStore,
    removeExperience: removeExperienceStore,
    education,
    setEducation,
    addEducation: addEducationStore,
    updateEducation: updateEducationStore,
    removeEducation: removeEducationStore,
    skills,
    setSkills,
    addSkill: addSkillStore,
    removeSkill: removeSkillStore,
    setView,
    profileStep,
    setProfileStep,
  } = useAppStore();

  // Local state
  const [currentStep, setCurrentStep] = useState(profileStep);
  const [direction, setDirection] = useState(0);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Experience form state
  const [showExpForm, setShowExpForm] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<ExperienceData>(emptyExperience());

  // Education form state
  const [showEduForm, setShowEduForm] = useState(false);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState<EducationData>(emptyEducation());

  // Skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'technical' | 'soft' | 'language' | 'other'>('technical');

  // ── Fetch profile data on mount ───────────────────────────
  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      setInitialLoading(true);
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        const p = data.profile;
        if (p) {
          setProfile({
            id: p.id,
            firstName: p.firstName || '',
            lastName: p.lastName || '',
            jobTitle: p.jobTitle || '',
            email: p.email || '',
            phone: p.phone || '',
            location: p.location || '',
            website: p.website || '',
            linkedin: p.linkedin || '',
            github: p.github || '',
            summary: p.summary || '',
          });
          if (p.experiences) setExperiences(p.experiences);
          if (p.education) setEducation(p.education);
          if (p.skills) setSkills(p.skills);
        }
      }
    } catch {
      toast.error('Failed to load profile data');
    } finally {
      setInitialLoading(false);
    }
  }, [session?.user?.id, setProfile, setExperiences, setEducation, setSkills]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ── Save profile (PUT) ──────────────────────────────────────
  const saveProfile = useCallback(
    async (data: Partial<ProfileData>) => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const result = await res.json();
          setProfile(result.profile);
        }
      } catch {
        toast.error('Failed to save profile');
      }
    },
    [session?.user?.id, setProfile]
  );

  // ── Step navigation ─────────────────────────────────────────
  const goToStep = useCallback(
    async (step: number) => {
      setDirection(step > currentStep ? 1 : -1);

      // Save current step data before transitioning
      setSaving(true);
      try {
        if (currentStep === 0) {
          await saveProfile({
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            jobTitle: profile?.jobTitle,
            email: profile?.email,
            phone: profile?.phone,
            location: profile?.location,
            website: profile?.website,
            linkedin: profile?.linkedin,
            github: profile?.github,
          });
        } else if (currentStep === 1) {
          await saveProfile({ summary: profile?.summary });
        }
      } finally {
        setSaving(false);
      }

      setCurrentStep(step);
      setProfileStep(step);
    },
    [currentStep, profile, saveProfile, setProfileStep]
  );

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      await saveProfile({ summary: profile?.summary });
      toast.success('Profile saved successfully!');
      setView('templates');
    } finally {
      setSaving(false);
    }
  };

  // ── AI Generate Summary ─────────────────────────────────────
  const generateSummary = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summary',
          context: {
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            jobTitle: profile?.jobTitle,
            experiences: experiences.map((e) => ({
              position: e.position,
              company: e.company,
              description: e.description,
            })),
            skills: skills.map((s) => ({ name: s.name, category: s.category })),
            summary: profile?.summary,
          },
        }),
      });
      const data = await res.json();
      if (data.content) {
        setProfile({ ...profile!, summary: data.content });
        toast.success('Summary generated!');
      }
    } catch {
      toast.error('Failed to generate summary');
    } finally {
      setAiLoading(false);
    }
  };

  // ── AI Suggest Skills ───────────────────────────────────────
  const suggestSkills = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'skills',
          context: {
            jobTitle: profile?.jobTitle,
            currentSkills: skills.map((s) => s.name),
          },
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.content)) {
        let addedCount = 0;
        for (const skill of data.content) {
          // Avoid duplicates
          const exists = skills.some(
            (s) => s.name.toLowerCase() === skill.name?.toLowerCase()
          );
          if (!exists && skill.name) {
            // Save to API
            const skillRes = await fetch('/api/profile/skill', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: skill.name,
                category: skill.category || 'technical',
                order: skills.length + addedCount,
              }),
            });
            if (skillRes.ok) {
              const skillData = await skillRes.json();
              addSkillStore(skillData.skill);
              addedCount++;
            }
          }
        }
        if (addedCount > 0) {
          toast.success(`${addedCount} skills added!`);
        } else {
          toast.info('No new skills to add');
        }
      }
    } catch {
      toast.error('Failed to suggest skills');
    } finally {
      setAiLoading(false);
    }
  };

  // ── Experience CRUD ─────────────────────────────────────────
  const handleSaveExperience = async () => {
    if (!expForm.company || !expForm.position || !expForm.startDate) {
      toast.error('Company, position, and start date are required');
      return;
    }

    try {
      if (editingExpId) {
        // Update
        const res = await fetch('/api/profile/experience', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingExpId, ...expForm }),
        });
        if (res.ok) {
          const data = await res.json();
          updateExperienceStore(editingExpId, data.experience);
          toast.success('Experience updated');
        }
      } else {
        // Create
        const res = await fetch('/api/profile/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...expForm, order: experiences.length }),
        });
        if (res.ok) {
          const data = await res.json();
          addExperienceStore(data.experience);
          toast.success('Experience added');
        }
      }
      setShowExpForm(false);
      setEditingExpId(null);
      setExpForm(emptyExperience());
    } catch {
      toast.error('Failed to save experience');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      const res = await fetch('/api/profile/experience', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        removeExperienceStore(id);
        toast.success('Experience deleted');
      }
    } catch {
      toast.error('Failed to delete experience');
    }
  };

  const handleEditExperience = (exp: ExperienceData) => {
    setEditingExpId(exp.id || null);
    setExpForm({ ...exp });
    setShowExpForm(true);
  };

  // ── Education CRUD ──────────────────────────────────────────
  const handleSaveEducation = async () => {
    if (!eduForm.institution || !eduForm.degree || !eduForm.startDate) {
      toast.error('Institution, degree, and start date are required');
      return;
    }

    try {
      if (editingEduId) {
        // Update
        const res = await fetch('/api/profile/education', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingEduId, ...eduForm }),
        });
        if (res.ok) {
          const data = await res.json();
          updateEducationStore(editingEduId, data.education);
          toast.success('Education updated');
        }
      } else {
        // Create
        const res = await fetch('/api/profile/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...eduForm, order: education.length }),
        });
        if (res.ok) {
          const data = await res.json();
          addEducationStore(data.education);
          toast.success('Education added');
        }
      }
      setShowEduForm(false);
      setEditingEduId(null);
      setEduForm(emptyEducation());
    } catch {
      toast.error('Failed to save education');
    }
  };

  const handleDeleteEducation = async (id: string) => {
    try {
      const res = await fetch('/api/profile/education', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        removeEducationStore(id);
        toast.success('Education deleted');
      }
    } catch {
      toast.error('Failed to delete education');
    }
  };

  const handleEditEducation = (edu: EducationData) => {
    setEditingEduId(edu.id || null);
    setEduForm({ ...edu });
    setShowEduForm(true);
  };

  // ── Skill CRUD ──────────────────────────────────────────────
  const handleAddSkill = async () => {
    if (!newSkillName.trim()) {
      toast.error('Skill name is required');
      return;
    }
    // Check duplicate
    if (skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      toast.error('Skill already exists');
      return;
    }

    try {
      const res = await fetch('/api/profile/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSkillName.trim(),
          category: newSkillCategory,
          order: skills.length,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        addSkillStore(data.skill);
        setNewSkillName('');
        toast.success('Skill added');
      }
    } catch {
      toast.error('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const res = await fetch('/api/profile/skill', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        removeSkillStore(id);
        toast.success('Skill removed');
      }
    } catch {
      toast.error('Failed to remove skill');
    }
  };

  // ── Profile field updater ───────────────────────────────────
  const updateProfileField = (field: keyof ProfileData, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  // ── Progress ────────────────────────────────────────────────
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  // ── Loading state ───────────────────────────────────────────
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  // ================================================================
  // Render Step Content
  // ================================================================
  const renderStepContent = () => {
    switch (currentStep) {
      // ── Step 1: Personal Info ──────────────────────────────
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={profile?.firstName || ''}
                  onChange={(e) => updateProfileField('firstName', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={profile?.lastName || ''}
                  onChange={(e) => updateProfileField('lastName', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="Senior Software Engineer"
                value={profile?.jobTitle || ''}
                onChange={(e) => updateProfileField('jobTitle', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={profile?.email || ''}
                  onChange={(e) => updateProfileField('email', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={profile?.phone || ''}
                  onChange={(e) => updateProfileField('phone', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={profile?.location || ''}
                onChange={(e) => updateProfileField('location', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://johndoe.com"
                  value={profile?.website || ''}
                  onChange={(e) => updateProfileField('website', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/in/johndoe"
                  value={profile?.linkedin || ''}
                  onChange={(e) => updateProfileField('linkedin', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="github.com/johndoe"
                  value={profile?.github || ''}
                  onChange={(e) => updateProfileField('github', e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
              </div>
            </div>
          </div>
        );

      // ── Step 2: Summary ───────────────────────────────────
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary" className="text-base">
                Professional Summary
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateSummary}
                disabled={aiLoading}
                className="gap-1.5"
              >
                {aiLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                AI Generate
              </Button>
            </div>
            <Textarea
              id="summary"
              placeholder="Write a brief professional summary highlighting your experience, skills, and career goals..."
              value={profile?.summary || ''}
              onChange={(e) => updateProfileField('summary', e.target.value)}
              className="min-h-[200px] bg-secondary/50 border-border/50 resize-y"
            />
            <p className="text-xs text-muted-foreground">
              Tip: Click &quot;AI Generate&quot; to create a summary based on your profile, or write your own.
            </p>
          </div>
        );

      // ── Step 3: Experience & Education ────────────────────
      case 2:
        return (
          <div className="space-y-8">
            {/* Experience Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="size-5 text-primary" />
                  Work Experience
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingExpId(null);
                    setExpForm(emptyExperience());
                    setShowExpForm(true);
                  }}
                  className="gap-1.5"
                >
                  <Plus className="size-3.5" />
                  Add Experience
                </Button>
              </div>

              {/* Experience Form */}
              <AnimatePresence>
                {showExpForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Card className="border-primary/20 bg-secondary/30">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company *</Label>
                            <Input
                              placeholder="Google"
                              value={expForm.company}
                              onChange={(e) =>
                                setExpForm({ ...expForm, company: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Position *</Label>
                            <Input
                              placeholder="Senior Engineer"
                              value={expForm.position}
                              onChange={(e) =>
                                setExpForm({ ...expForm, position: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            placeholder="Mountain View, CA"
                            value={expForm.location || ''}
                            onChange={(e) =>
                              setExpForm({ ...expForm, location: e.target.value })
                            }
                            className="bg-background/50 border-border/50"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <Input
                              type="month"
                              value={expForm.startDate}
                              onChange={(e) =>
                                setExpForm({ ...expForm, startDate: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={expForm.endDate || ''}
                              onChange={(e) =>
                                setExpForm({ ...expForm, endDate: e.target.value })
                              }
                              disabled={expForm.current}
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="exp-current"
                            checked={expForm.current}
                            onCheckedChange={(checked) =>
                              setExpForm({
                                ...expForm,
                                current: checked === true,
                                endDate: checked === true ? '' : expForm.endDate,
                              })
                            }
                          />
                          <Label htmlFor="exp-current" className="cursor-pointer">
                            I currently work here
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            value={expForm.description || ''}
                            onChange={(e) =>
                              setExpForm({ ...expForm, description: e.target.value })
                            }
                            className="min-h-[100px] bg-background/50 border-border/50 resize-y"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setShowExpForm(false);
                              setEditingExpId(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleSaveExperience}
                          >
                            {editingExpId ? 'Update' : 'Save'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Experience Cards */}
              {experiences.length === 0 && !showExpForm ? (
                <div className="text-center py-8 text-muted-foreground border border-dashed border-border/50 rounded-lg">
                  <Briefcase className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No experience added yet</p>
                  <p className="text-xs">Click &quot;Add Experience&quot; to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {experiences.map((exp) => (
                    <Card key={exp.id} className="bg-secondary/20 hover:bg-secondary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {exp.position}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {exp.company}
                              {exp.location ? ` · ${exp.location}` : ''}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'N/A'}
                            </p>
                            {exp.description && (
                              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                {exp.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => handleEditExperience(exp)}
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 text-destructive hover:text-destructive"
                              onClick={() => exp.id && handleDeleteExperience(exp.id)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="size-5 text-primary" />
                  Education
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingEduId(null);
                    setEduForm(emptyEducation());
                    setShowEduForm(true);
                  }}
                  className="gap-1.5"
                >
                  <Plus className="size-3.5" />
                  Add Education
                </Button>
              </div>

              {/* Education Form */}
              <AnimatePresence>
                {showEduForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Card className="border-primary/20 bg-secondary/30">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution *</Label>
                            <Input
                              placeholder="MIT"
                              value={eduForm.institution}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, institution: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree *</Label>
                            <Input
                              placeholder="Bachelor of Science"
                              value={eduForm.degree}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, degree: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                              placeholder="Computer Science"
                              value={eduForm.field || ''}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, field: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                              placeholder="Cambridge, MA"
                              value={eduForm.location || ''}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, location: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <Input
                              type="month"
                              value={eduForm.startDate}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, startDate: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={eduForm.endDate || ''}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, endDate: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>GPA</Label>
                            <Input
                              placeholder="3.8/4.0"
                              value={eduForm.gpa || ''}
                              onChange={(e) =>
                                setEduForm({ ...eduForm, gpa: e.target.value })
                              }
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Notable achievements, activities..."
                            value={eduForm.description || ''}
                            onChange={(e) =>
                              setEduForm({ ...eduForm, description: e.target.value })
                            }
                            className="min-h-[80px] bg-background/50 border-border/50 resize-y"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setShowEduForm(false);
                              setEditingEduId(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleSaveEducation}
                          >
                            {editingEduId ? 'Update' : 'Save'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Education Cards */}
              {education.length === 0 && !showEduForm ? (
                <div className="text-center py-8 text-muted-foreground border border-dashed border-border/50 rounded-lg">
                  <GraduationCap className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No education added yet</p>
                  <p className="text-xs">Click &quot;Add Education&quot; to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {education.map((edu) => (
                    <Card key={edu.id} className="bg-secondary/20 hover:bg-secondary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {edu.degree}
                              {edu.field ? ` in ${edu.field}` : ''}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {edu.institution}
                              {edu.location ? ` · ${edu.location}` : ''}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {edu.startDate} — {edu.endDate || 'N/A'}
                              {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                            </p>
                            {edu.description && (
                              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                {edu.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => handleEditEducation(edu)}
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 text-destructive hover:text-destructive"
                              onClick={() => edu.id && handleDeleteEducation(edu.id)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      // ── Step 4: Skills ────────────────────────────────────
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Skills</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={suggestSkills}
                disabled={aiLoading}
                className="gap-1.5"
              >
                {aiLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                AI Suggest Skills
              </Button>
            </div>

            {/* Add Skill Form */}
            <div className="flex gap-2">
              <Input
                placeholder="Enter a skill (e.g. React, Leadership)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 bg-secondary/50 border-border/50"
              />
              <Select
                value={newSkillCategory}
                onValueChange={(v) =>
                  setNewSkillCategory(v as 'technical' | 'soft' | 'language' | 'other')
                }
              >
                <SelectTrigger className="w-[140px] bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" size="icon" onClick={handleAddSkill}>
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Skills by Category */}
            {skills.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border border-dashed border-border/50 rounded-lg">
                <Lightbulb className="size-8 mx-auto mb-2 opacity-50" />
                <p>No skills added yet</p>
                <p className="text-xs">Add skills manually or use AI suggestions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(['technical', 'soft', 'language', 'other'] as const).map((category) => {
                  const categorySkills = skills.filter((s) => s.category === category);
                  if (categorySkills.length === 0) return null;

                  const categoryLabel: Record<string, string> = {
                    technical: 'Technical Skills',
                    soft: 'Soft Skills',
                    language: 'Languages',
                    other: 'Other Skills',
                  };

                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        {categoryLabel[category]}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="secondary"
                            className="px-3 py-1.5 text-sm gap-1.5 bg-secondary/50 hover:bg-secondary/80 transition-colors"
                          >
                            {skill.name}
                            <button
                              type="button"
                              onClick={() => skill.id && handleDeleteSkill(skill.id)}
                              className="ml-0.5 hover:text-destructive transition-colors"
                            >
                              <Trash2 className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // ================================================================
  // Main Render
  // ================================================================
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Complete your profile to build professional resumes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progressValue} className="h-2 mb-4" />
          <div className="flex justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => {
                    if (isCompleted) goToStep(index);
                  }}
                  className={`flex flex-col items-center gap-1.5 transition-all ${
                    isActive
                      ? 'text-primary'
                      : isCompleted
                        ? 'text-primary/70 cursor-pointer'
                        : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`size-9 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : isCompleted
                          ? 'bg-primary/20 text-primary'
                          : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium hidden sm:block">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content Card */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              {(() => {
                const StepIcon = STEPS[currentStep].icon;
                return <StepIcon className="size-5 text-primary" />;
              })()}
              {STEPS[currentStep].label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0 || saving}
                className="gap-1.5"
              >
                <ChevronLeft className="size-4" />
                Back
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={saving}
                  className="gap-1.5"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleComplete}
                  disabled={saving}
                  className="gap-1.5"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" />
                  )}
                  Complete &amp; Continue
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
