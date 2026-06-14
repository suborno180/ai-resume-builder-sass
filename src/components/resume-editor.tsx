'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Eye, Plus, Trash2, ChevronDown, Loader2 } from 'lucide-react';
import { renderResume } from '@/components/resume-templates';
import type { ResumeRenderData, ExperienceData, EducationData, SkillData } from '@/lib/types';

// ── Template display names ───────────────────────────────────────
const templateNames: Record<string, string> = {
  minimal: 'Minimal',
  modern: 'Modern',
  professional: 'Professional',
  creative: 'Creative',
  executive: 'Executive',
  compact: 'Compact',
};

// ── Category labels ──────────────────────────────────────────────
const categoryLabels: Record<string, string> = {
  technical: 'Technical',
  soft: 'Soft Skills',
  language: 'Languages',
  other: 'Other',
};

// ── Animation variants ───────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ── Component ────────────────────────────────────────────────────
export default function ResumeEditor() {
  const { data: session } = useSession();
  const {
    profile,
    setProfile,
    experiences,
    setExperiences,
    addExperience,
    updateExperience,
    removeExperience,
    education,
    setEducation,
    addEducation,
    updateEducation,
    removeEducation,
    skills,
    setSkills,
    addSkill,
    removeSkill,
    currentResume,
    setCurrentResume,
    setView,
    selectedTemplate,
    setSelectedTemplate,
    aiLoading,
    setAiLoading,
  } = useAppStore();

  // ── Local state ──────────────────────────────────────────────
  const [personalOpen, setPersonalOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [expOpen, setExpOpen] = useState(true);
  const [eduOpen, setEduOpen] = useState(true);
  const [skillsOpen, setSkillsOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'technical' | 'soft' | 'language' | 'other'>('technical');
  const [showPreview, setShowPreview] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // ── Debounce refs ─────────────────────────────────────────────
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileRef = useRef(profile);
  const experiencesRef = useRef(experiences);
  const educationRef = useRef(education);
  const skillsRef = useRef(skills);

  // Keep refs in sync
  useEffect(() => { profileRef.current = profile; }, [profile]);
  useEffect(() => { experiencesRef.current = experiences; }, [experiences]);
  useEffect(() => { educationRef.current = education; }, [education]);
  useEffect(() => { skillsRef.current = skills; }, [skills]);

  // ── Template from resume or store ─────────────────────────────
  const activeTemplate = currentResume?.templateId || selectedTemplate;

  // ── Fetch data on mount ───────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        const p = data.profile;
        setProfile({
          id: p.id,
          firstName: p.firstName ?? '',
          lastName: p.lastName ?? '',
          jobTitle: p.jobTitle ?? '',
          email: p.email ?? '',
          phone: p.phone ?? '',
          location: p.location ?? '',
          website: p.website ?? '',
          linkedin: p.linkedin ?? '',
          github: p.github ?? '',
          summary: p.summary ?? '',
        });
        setExperiences(p.experiences || []);
        setEducation(p.education || []);
        setSkills(p.skills || []);
      }
    } catch {
      // silently ignore
    }
  }, [setProfile, setExperiences, setEducation, setSkills]);

  useEffect(() => {
    const load = async () => {
      setLoadingData(true);
      await fetchProfile();
      setLoadingData(false);
    };
    load();
  }, [fetchProfile]);

  // ── Auto-save (debounced) ─────────────────────────────────────
  const triggerAutoSave = useCallback(() => {
    if (!currentResume?.id) return;

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    autoSaveTimer.current = setTimeout(async () => {
      setSaving(true);
      try {
        const resumeContent = JSON.stringify({
          profile: profileRef.current,
          experiences: experiencesRef.current,
          education: educationRef.current,
          skills: skillsRef.current,
        });

        const res = await fetch('/api/resume', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: currentResume.id,
            content: resumeContent,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentResume({ ...currentResume, ...data.resume });
        }
      } catch {
        // silently fail auto-save
      } finally {
        setSaving(false);
      }
    }, 1500);
  }, [currentResume, setCurrentResume]);

  // Trigger auto-save whenever data changes
  useEffect(() => {
    if (!loadingData) {
      triggerAutoSave();
    }
  }, [profile, experiences, education, skills, loadingData, triggerAutoSave]);

  // ── AI Enhancement ────────────────────────────────────────────
  const enhanceWithAI = async (type: string, context: Record<string, unknown>) => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, context }),
      });
      const data = await res.json();
      return data.content;
    } catch {
      toast.error('AI generation failed');
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  // ── Profile field update ──────────────────────────────────────
  const updateProfileField = (field: string, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  // ── Save profile to API ───────────────────────────────────────
  const saveProfile = async () => {
    if (!profile) return;
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
    } catch {
      // silently fail
    }
  };

  // ── Experience handlers ───────────────────────────────────────
  const handleAddExperience = async () => {
    try {
      const res = await fetch('/api/profile/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: 'New Company',
          position: 'New Position',
          startDate: new Date().toISOString().slice(0, 7),
          current: false,
          order: experiences.length,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        addExperience(data.experience);
        toast.success('Experience added');
      }
    } catch {
      toast.error('Failed to add experience');
    }
  };

  const handleUpdateExperience = async (id: string, updates: Partial<ExperienceData>) => {
    updateExperience(id, updates);
    try {
      await fetch('/api/profile/experience', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
    } catch {
      // silently fail
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
        removeExperience(id);
        toast.success('Experience removed');
      }
    } catch {
      toast.error('Failed to delete experience');
    }
  };

  // ── Education handlers ────────────────────────────────────────
  const handleAddEducation = async () => {
    try {
      const res = await fetch('/api/profile/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          institution: 'New Institution',
          degree: 'Degree',
          startDate: new Date().toISOString().slice(0, 7),
          order: education.length,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        addEducation(data.education);
        toast.success('Education added');
      }
    } catch {
      toast.error('Failed to add education');
    }
  };

  const handleUpdateEducation = async (id: string, updates: Partial<EducationData>) => {
    updateEducation(id, updates);
    try {
      await fetch('/api/profile/education', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
    } catch {
      // silently fail
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
        removeEducation(id);
        toast.success('Education removed');
      }
    } catch {
      toast.error('Failed to delete education');
    }
  };

  // ── Skill handlers ────────────────────────────────────────────
  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
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
        addSkill(data.skill);
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
        removeSkill(id);
        toast.success('Skill removed');
      }
    } catch {
      toast.error('Failed to delete skill');
    }
  };

  // ── AI: Enhance Summary ───────────────────────────────────────
  const handleAIEnhanceSummary = async () => {
    if (!profile) return;
    const result = await enhanceWithAI('summary', {
      firstName: profile.firstName,
      lastName: profile.lastName,
      jobTitle: profile.jobTitle,
      experiences: experiences.map(e => ({ position: e.position, company: e.company, description: e.description })),
      skills: skills.map(s => ({ name: s.name, category: s.category })),
      summary: profile.summary,
    });
    if (result) {
      setProfile({ ...profile, summary: result });
      await saveProfile();
      toast.success('Summary enhanced with AI');
    }
  };

  // ── AI: Generate Experience Description ────────────────────────
  const handleAIExperience = async (exp: ExperienceData) => {
    const result = await enhanceWithAI('experience', {
      position: exp.position,
      company: exp.company,
      description: exp.description,
    });
    if (result && exp.id) {
      updateExperience(exp.id, { description: result });
      try {
        await fetch('/api/profile/experience', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: exp.id, description: result }),
        });
      } catch {
        // silently fail
      }
      toast.success('Description generated with AI');
    }
  };

  // ── AI: Suggest Skills ────────────────────────────────────────
  const handleAISuggestSkills = async () => {
    const result = await enhanceWithAI('skills', {
      jobTitle: profile?.jobTitle,
      currentSkills: skills.map(s => s.name),
    });
    if (Array.isArray(result)) {
      let addedCount = 0;
      for (const skill of result) {
        const name = typeof skill === 'object' && skill.name ? skill.name : String(skill);
        const category = typeof skill === 'object' && skill.category
          ? (['technical', 'soft', 'language', 'other'].includes(skill.category) ? skill.category : 'other')
          : 'technical';

        // Avoid duplicates
        if (skills.some(s => s.name.toLowerCase() === name.toLowerCase())) continue;
        if (skillsRef.current.some(s => s.name.toLowerCase() === name.toLowerCase())) continue;

        try {
          const res = await fetch('/api/profile/skill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, order: skillsRef.current.length + addedCount }),
          });
          if (res.ok) {
            const data = await res.json();
            addSkill(data.skill);
            addedCount++;
          }
        } catch {
          // continue
        }
      }
      if (addedCount > 0) {
        toast.success(`${addedCount} skill${addedCount > 1 ? 's' : ''} added`);
      } else {
        toast.info('No new skills to add');
      }
    }
  };

  // ── Template change ───────────────────────────────────────────
  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplate(templateId);
    if (currentResume?.id) {
      try {
        await fetch('/api/resume', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentResume.id, templateId }),
        });
        setCurrentResume({ ...currentResume, templateId });
      } catch {
        // silently fail
      }
    }
  };

  // ── Resume render data ────────────────────────────────────────
  const resumeData: ResumeRenderData = {
    profile: profile || {},
    experiences,
    education,
    skills,
  };

  // ── Loading state ─────────────────────────────────────────────
  if (loadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading editor…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => setView('dashboard')}
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-base font-semibold tracking-tight">Edit Resume</h1>
            <Badge variant="secondary" className="text-xs">
              {templateNames[activeTemplate] || activeTemplate}
            </Badge>
            {saving && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="size-3 animate-spin" />
                Saving…
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={activeTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(templateNames).map(([id, name]) => (
                  <SelectItem key={id} value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setAiLoading(true);
                toast.info('AI Assistant is available in the editor panels');
                setAiLoading(false);
              }}
            >
              <Sparkles className="size-3.5" />
              <span className="hidden sm:inline">AI Assist</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 lg:hidden"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="size-3.5" />
              Preview
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ── Left Panel: Editor ────────────────────────────────── */}
        <div className={`flex-1 lg:w-1/2 lg:max-w-[600px] border-r border-border/50 ${showPreview ? 'hidden lg:block' : ''}`}>
          <ScrollArea className="h-[calc(100vh-56px)]">
            <div className="p-4 sm:p-6 space-y-4">

              {/* ── Personal Info ────────────────────────────────── */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Collapsible open={personalOpen} onOpenChange={setPersonalOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
                    <h2 className="text-sm font-semibold tracking-tight">Personal Info</h2>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform ${personalOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-xs">First Name</Label>
                            <Input
                              value={profile?.firstName || ''}
                              onChange={(e) => updateProfileField('firstName', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="John"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs">Last Name</Label>
                            <Input
                              value={profile?.lastName || ''}
                              onChange={(e) => updateProfileField('lastName', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Job Title</Label>
                          <Input
                            value={profile?.jobTitle || ''}
                            onChange={(e) => updateProfileField('jobTitle', e.target.value)}
                            onBlur={saveProfile}
                            className="h-8 text-sm bg-secondary/50 border-border/50"
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-xs">Email</Label>
                            <Input
                              type="email"
                              value={profile?.email || ''}
                              onChange={(e) => updateProfileField('email', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs">Phone</Label>
                            <Input
                              value={profile?.phone || ''}
                              onChange={(e) => updateProfileField('phone', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Location</Label>
                          <Input
                            value={profile?.location || ''}
                            onChange={(e) => updateProfileField('location', e.target.value)}
                            onBlur={saveProfile}
                            className="h-8 text-sm bg-secondary/50 border-border/50"
                            placeholder="San Francisco, CA"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-xs">Website</Label>
                            <Input
                              value={profile?.website || ''}
                              onChange={(e) => updateProfileField('website', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="yoursite.com"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs">LinkedIn</Label>
                            <Input
                              value={profile?.linkedin || ''}
                              onChange={(e) => updateProfileField('linkedin', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="username"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs">GitHub</Label>
                            <Input
                              value={profile?.github || ''}
                              onChange={(e) => updateProfileField('github', e.target.value)}
                              onBlur={saveProfile}
                              className="h-8 text-sm bg-secondary/50 border-border/50"
                              placeholder="username"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>

              <Separator className="opacity-50" />

              {/* ── Summary ─────────────────────────────────────── */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Collapsible open={summaryOpen} onOpenChange={setSummaryOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
                    <h2 className="text-sm font-semibold tracking-tight">Summary</h2>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-4 space-y-3">
                        <Textarea
                          value={profile?.summary || ''}
                          onChange={(e) => updateProfileField('summary', e.target.value)}
                          onBlur={saveProfile}
                          className="min-h-[120px] text-sm bg-secondary/50 border-border/50 resize-none"
                          placeholder="Write a professional summary about yourself…"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 w-full"
                          onClick={handleAIEnhanceSummary}
                          disabled={aiLoading}
                        >
                          {aiLoading ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="size-3.5" />
                          )}
                          AI Enhance
                        </Button>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>

              <Separator className="opacity-50" />

              {/* ── Experience ──────────────────────────────────── */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Collapsible open={expOpen} onOpenChange={setExpOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
                    <h2 className="text-sm font-semibold tracking-tight">Experience ({experiences.length})</h2>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform ${expOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-3">
                      {experiences.length === 0 && (
                        <Card className="border-dashed border-border/60">
                          <CardContent className="py-6 text-center">
                            <p className="text-sm text-muted-foreground">No experience added yet</p>
                          </CardContent>
                        </Card>
                      )}
                      {experiences.map((exp) => (
                        <Card key={exp.id} className="border-border/50 bg-card/50">
                          <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-sm font-medium">{exp.position} at {exp.company}</CardTitle>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => exp.id && handleDeleteExperience(exp.id)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="px-4 pb-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => exp.id && handleUpdateExperience(exp.id, { company: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">Position</Label>
                                <Input
                                  value={exp.position}
                                  onChange={(e) => exp.id && handleUpdateExperience(exp.id, { position: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">Location</Label>
                              <Input
                                value={exp.location || ''}
                                onChange={(e) => exp.id && handleUpdateExperience(exp.id, { location: e.target.value })}
                                className="h-8 text-sm bg-secondary/50 border-border/50"
                                placeholder="City, State"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Start Date</Label>
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => exp.id && handleUpdateExperience(exp.id, { startDate: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">End Date</Label>
                                <Input
                                  type="month"
                                  value={exp.endDate || ''}
                                  onChange={(e) => exp.id && handleUpdateExperience(exp.id, { endDate: e.target.value })}
                                  disabled={exp.current}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`exp-current-${exp.id}`}
                                checked={exp.current}
                                onCheckedChange={(checked) =>
                                  exp.id && handleUpdateExperience(exp.id, { current: !!checked, endDate: checked ? '' : exp.endDate })
                                }
                              />
                              <Label htmlFor={`exp-current-${exp.id}`} className="text-xs cursor-pointer">
                                Currently working here
                              </Label>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">Description</Label>
                              <Textarea
                                value={exp.description || ''}
                                onChange={(e) => exp.id && handleUpdateExperience(exp.id, { description: e.target.value })}
                                className="min-h-[80px] text-sm bg-secondary/50 border-border/50 resize-none"
                                placeholder="Describe your responsibilities and achievements…"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5 w-full"
                                onClick={() => handleAIExperience(exp)}
                                disabled={aiLoading}
                              >
                                {aiLoading ? (
                                  <Loader2 className="size-3.5 animate-spin" />
                                ) : (
                                  <Sparkles className="size-3.5" />
                                )}
                                AI Generate Description
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 w-full border-dashed"
                        onClick={handleAddExperience}
                      >
                        <Plus className="size-3.5" />
                        Add Experience
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>

              <Separator className="opacity-50" />

              {/* ── Education ───────────────────────────────────── */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Collapsible open={eduOpen} onOpenChange={setEduOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
                    <h2 className="text-sm font-semibold tracking-tight">Education ({education.length})</h2>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform ${eduOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-3">
                      {education.length === 0 && (
                        <Card className="border-dashed border-border/60">
                          <CardContent className="py-6 text-center">
                            <p className="text-sm text-muted-foreground">No education added yet</p>
                          </CardContent>
                        </Card>
                      )}
                      {education.map((edu) => (
                        <Card key={edu.id} className="border-border/50 bg-card/50">
                          <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-sm font-medium">{edu.degree} — {edu.institution}</CardTitle>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => edu.id && handleDeleteEducation(edu.id)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="px-4 pb-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { institution: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { degree: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Field of Study</Label>
                                <Input
                                  value={edu.field || ''}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { field: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                  placeholder="Computer Science"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">Location</Label>
                                <Input
                                  value={edu.location || ''}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { location: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                  placeholder="City, State"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Start Date</Label>
                                <Input
                                  type="month"
                                  value={edu.startDate}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { startDate: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">End Date</Label>
                                <Input
                                  type="month"
                                  value={edu.endDate || ''}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { endDate: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">GPA</Label>
                                <Input
                                  value={edu.gpa || ''}
                                  onChange={(e) => edu.id && handleUpdateEducation(edu.id, { gpa: e.target.value })}
                                  className="h-8 text-sm bg-secondary/50 border-border/50"
                                  placeholder="3.8"
                                />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">Description</Label>
                              <Textarea
                                value={edu.description || ''}
                                onChange={(e) => edu.id && handleUpdateEducation(edu.id, { description: e.target.value })}
                                className="min-h-[60px] text-sm bg-secondary/50 border-border/50 resize-none"
                                placeholder="Notable achievements, activities…"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 w-full border-dashed"
                        onClick={handleAddEducation}
                      >
                        <Plus className="size-3.5" />
                        Add Education
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>

              <Separator className="opacity-50" />

              {/* ── Skills ──────────────────────────────────────── */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <Collapsible open={skillsOpen} onOpenChange={setSkillsOpen}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary transition-colors">
                    <h2 className="text-sm font-semibold tracking-tight">Skills ({skills.length})</h2>
                    <ChevronDown className={`size-4 text-muted-foreground transition-transform ${skillsOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="p-4 space-y-3">
                        {/* AI Suggest */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 w-full"
                          onClick={handleAISuggestSkills}
                          disabled={aiLoading}
                        >
                          {aiLoading ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="size-3.5" />
                          )}
                          AI Suggest Skills
                        </Button>

                        {/* Skill badges */}
                        {skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <Badge
                                key={skill.id}
                                variant="secondary"
                                className="gap-1 pr-1 text-xs"
                              >
                                <span style={{ color: categoryColor(skill.category) }}>●</span>
                                {skill.name}
                                <button
                                  onClick={() => skill.id && handleDeleteSkill(skill.id)}
                                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                                >
                                  <Trash2 className="size-2.5" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}

                        {skills.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-2">
                            No skills added yet. Use AI suggestions or add manually.
                          </p>
                        )}

                        {/* Add skill manually */}
                        <div className="flex gap-2">
                          <Input
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            placeholder="Skill name"
                            className="h-8 text-sm bg-secondary/50 border-border/50 flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                          />
                          <Select value={newSkillCategory} onValueChange={(v) => setNewSkillCategory(v as typeof newSkillCategory)}>
                            <SelectTrigger className="w-[110px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical</SelectItem>
                              <SelectItem value="soft">Soft Skill</SelectItem>
                              <SelectItem value="language">Language</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            className="h-8 gap-1"
                            onClick={handleAddSkill}
                            disabled={!newSkillName.trim()}
                          >
                            <Plus className="size-3.5" />
                            Add
                          </Button>
                        </div>

                        {/* Legend */}
                        {skills.length > 0 && (
                          <div className="flex gap-3 text-[10px] text-muted-foreground">
                            {Object.entries(categoryLabels).map(([key, label]) => (
                              <span key={key} className="flex items-center gap-1">
                                <span style={{ color: categoryColor(key) }}>●</span>
                                {label}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>

              {/* Bottom spacer */}
              <div className="h-8" />
            </div>
          </ScrollArea>
        </div>

        {/* ── Right Panel: Live Preview ────────────────────────── */}
        <div className={`flex-1 lg:w-1/2 ${showPreview ? '' : 'hidden lg:block'}`}>
          <div className="h-[calc(100vh-56px)] flex flex-col items-center bg-muted/30 p-4 sm:p-6">
            {/* Preview toolbar */}
            <div className="flex items-center justify-between w-full max-w-[600px] mb-4">
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-xs"
                onClick={() => setShowPreview(false)}
              >
                Back to Editor
              </Button>
            </div>

            {/* A4 Preview */}
            <div className="flex-1 overflow-auto w-full flex justify-center">
              <div
                className="bg-white shadow-2xl rounded-sm origin-top"
                style={{
                  width: '794px',
                  minHeight: '1123px',
                  transform: 'scale(0.55)',
                  transformOrigin: 'top center',
                  marginBottom: '-450px',
                }}
              >
                {renderResume(activeTemplate, resumeData)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper: category colors ─────────────────────────────────────
function categoryColor(cat: string): string {
  switch (cat) {
    case 'technical': return '#10b981';
    case 'soft': return '#6366f1';
    case 'language': return '#f59e0b';
    default: return '#8b5cf6';
  }
}
