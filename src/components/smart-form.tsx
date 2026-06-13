'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  Loader2,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  FileText,
  Award,
  FolderGit2,
  Languages,
  Heart,
} from 'lucide-react';
import type { ExperienceData, EducationData, SkillData, FieldRequirement } from '@/lib/types';

// ── Section icon mapping ────────────────────────────────────
const sectionIcons: Record<string, React.ElementType> = {
  personal: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Lightbulb,
  certifications: Award,
  projects: FolderGit2,
  languages: Languages,
  volunteer: Heart,
};

// ── Animation ───────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function SmartForm() {
  const { data: session } = useSession();
  const {
    setView,
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
    jobAnalysis,
    targetJobTitle,
    targetJobDescription,
    polishedContent,
  } = useAppStore();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [projects, setProjects] = useState<Array<{ name: string; description: string }>>([]);
  const [volunteerInfo, setVolunteerInfo] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [saving, setSaving] = useState(false);

  // ── Pre-fill from AI analysis ─────────────────────────────
  useEffect(() => {
    if (jobAnalysis) {
      // Pre-fill skills from AI
      if (jobAnalysis.relevantSkills?.length && skills.length === 0) {
        const aiSkills: SkillData[] = jobAnalysis.relevantSkills.map((s, i) => ({
          id: `ai-skill-${i}`,
          name: s.name,
          category: s.category,
          order: i,
        }));
        setSkills(aiSkills);
      }

      // Open sections that AI says are needed
      const updatedOpen: Record<string, boolean> = {
        personal: true,
        summary: true,
        experience: true,
        education: true,
        skills: true,
      };
      jobAnalysis.suggestedSections?.forEach((s) => {
        updatedOpen[s] = true;
      });
      setOpenSections(updatedOpen);
    }
  }, [jobAnalysis]);

  // ── Save profile to API ───────────────────────────────────
  const saveProfile = useCallback(async () => {
    setSaving(true);
    try {
      // Save profile
      if (profile) {
        await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        });
      }

      // Save experiences
      for (const exp of experiences) {
        if (exp.id) {
          await fetch('/api/profile/experience', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exp),
          });
        } else {
          await fetch('/api/profile/experience', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...exp, order: experiences.indexOf(exp) }),
          });
        }
      }

      // Save education
      for (const edu of education) {
        if (edu.id) {
          await fetch('/api/profile/education', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(edu),
          });
        } else {
          await fetch('/api/profile/education', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...edu, order: education.indexOf(edu) }),
          });
        }
      }

      // Save skills
      for (const skill of skills) {
        if (!skill.id) {
          await fetch('/api/profile/skill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(skill),
          });
        }
      }

      toast.success('Progress saved');
    } catch {
      // silently ignore save errors
    } finally {
      setSaving(false);
    }
  }, [profile, experiences, education, skills]);

  // ── Toggle section ────────────────────────────────────────
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // ── Get dynamic sections from AI analysis ─────────────────
  const getDynamicSections = (): FieldRequirement[] => {
    if (!jobAnalysis?.fieldRequirements) return [];
    return jobAnalysis.fieldRequirements.filter(
      (f) =>
        !['personal', 'summary', 'experience', 'education', 'skills'].includes(
          f.section
        )
    );
  };

  // ── Get required sections ─────────────────────────────────
  const isSectionRequired = (section: string): boolean => {
    if (!jobAnalysis?.fieldRequirements) {
      return ['personal', 'summary', 'experience', 'education', 'skills'].includes(section);
    }
    return jobAnalysis.fieldRequirements.some(
      (f) => f.section === section && f.required
    );
  };

  // ── Update profile field ──────────────────────────────────
  const updateProfileField = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value } as typeof profile);
  };

  // ── Handle add experience ─────────────────────────────────
  const handleAddExperience = () => {
    addExperience({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      order: experiences.length,
    });
  };

  // ── Handle add education ──────────────────────────────────
  const handleAddEducation = () => {
    addEducation({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      order: education.length,
    });
  };

  // ── Handle add skill ──────────────────────────────────────
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    addSkill({
      name: newSkill.trim(),
      category: 'technical',
      order: skills.length,
    });
    setNewSkill('');
  };

  // ── Handle add certification ──────────────────────────────
  const handleAddCertification = () => {
    if (!newCertification.trim()) return;
    setCertifications((prev) => [...prev, newCertification.trim()]);
    setNewCertification('');
  };

  // ── Handle add project ────────────────────────────────────
  const handleAddProject = () => {
    if (!newProject.name.trim()) return;
    setProjects((prev) => [...prev, { ...newProject }]);
    setNewProject({ name: '', description: '' });
  };

  // ── Handle add language ───────────────────────────────────
  const handleAddLanguage = () => {
    if (!newLanguage.trim()) return;
    setLanguages((prev) => [...prev, newLanguage.trim()]);
    setNewLanguage('');
  };

  // ── Continue to AI Polish ─────────────────────────────────
  const handleContinue = async () => {
    try {
      await saveProfile();
    } catch {
      // Continue even if save fails
    }
    setView('ai-polish');
  };

  // ── Suggested summary from AI ─────────────────────────────
  const suggestedSummary = jobAnalysis?.suggestedSummary || '';
  const aiHints = jobAnalysis?.keyQualifications || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => setView('ai-chat')}
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                <FileText className="size-4 text-primary" />
              </div>
              <h1 className="text-base font-semibold tracking-tight">
                Smart Form
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {targetJobTitle && (
              <Badge variant="secondary" className="text-xs gap-1">
                <Sparkles className="size-3" />
                {targetJobTitle}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={saveProfile}
              disabled={saving}
              className="gap-1.5"
            >
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : null}
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* AI Hints */}
          {aiHints.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-2">
                        AI Tips for {targetJobTitle || 'your role'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {aiHints.map((hint, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs bg-primary/10"
                          >
                            {hint}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Personal Info Section */}
          <motion.div variants={itemVariants}>
            <Collapsible
              open={openSections.personal}
              onOpenChange={() => toggleSection('personal')}
            >
              <SectionHeader
                icon={User}
                title="Personal Info"
                required={isSectionRequired('personal')}
                open={openSections.personal}
              />
              <CollapsibleContent>
                <Card className="border-border/30">
                  <CardContent className="p-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile?.firstName || ''}
                          onChange={(e) =>
                            updateProfileField('firstName', e.target.value)
                          }
                          placeholder="John"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile?.lastName || ''}
                          onChange={(e) =>
                            updateProfileField('lastName', e.target.value)
                          }
                          placeholder="Doe"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile?.email || ''}
                          onChange={(e) =>
                            updateProfileField('email', e.target.value)
                          }
                          placeholder="john@example.com"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile?.phone || ''}
                          onChange={(e) =>
                            updateProfileField('phone', e.target.value)
                          }
                          placeholder="+1 (555) 000-0000"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile?.location || ''}
                          onChange={(e) =>
                            updateProfileField('location', e.target.value)
                          }
                          placeholder="San Francisco, CA"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profile?.website || ''}
                          onChange={(e) =>
                            updateProfileField('website', e.target.value)
                          }
                          placeholder="https://johndoe.com"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={profile?.linkedin || ''}
                          onChange={(e) =>
                            updateProfileField('linkedin', e.target.value)
                          }
                          placeholder="linkedin.com/in/johndoe"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={profile?.github || ''}
                          onChange={(e) =>
                            updateProfileField('github', e.target.value)
                          }
                          placeholder="github.com/johndoe"
                          className="bg-secondary/50 border-border/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Professional Summary Section */}
          <motion.div variants={itemVariants}>
            <Collapsible
              open={openSections.summary}
              onOpenChange={() => toggleSection('summary')}
            >
              <SectionHeader
                icon={FileText}
                title="Professional Summary"
                required={isSectionRequired('summary')}
                open={openSections.summary}
              />
              <CollapsibleContent>
                <Card className="border-border/30">
                  <CardContent className="p-6 space-y-3">
                    {suggestedSummary && !profile?.summary && (
                      <div className="rounded-md bg-primary/5 border border-primary/20 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="size-3.5 text-primary" />
                          <span className="text-xs font-medium text-primary">
                            AI Suggestion
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {suggestedSummary}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-xs text-primary h-7"
                          onClick={() =>
                            updateProfileField('summary', suggestedSummary)
                          }
                        >
                          Use this suggestion
                        </Button>
                      </div>
                    )}
                    <Textarea
                      value={profile?.summary || ''}
                      onChange={(e) =>
                        updateProfileField('summary', e.target.value)
                      }
                      placeholder="Write a brief professional summary highlighting your key achievements and career focus..."
                      className="min-h-[100px] bg-secondary/50 border-border/50"
                    />
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Work Experience Section */}
          <motion.div variants={itemVariants}>
            <Collapsible
              open={openSections.experience}
              onOpenChange={() => toggleSection('experience')}
            >
              <SectionHeader
                icon={Briefcase}
                title="Work Experience"
                required={isSectionRequired('experience')}
                open={openSections.experience}
                count={experiences.length}
              />
              <CollapsibleContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={exp.id || index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="border-border/30">
                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Experience {index + 1}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeExperience(exp.id || '')}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label>Position</Label>
                                <Input
                                  value={exp.position}
                                  onChange={(e) =>
                                    updateExperience(exp.id || '', {
                                      position: e.target.value,
                                    })
                                  }
                                  placeholder={jobAnalysis?.fieldRequirements?.find((f) => f.section === 'experience')?.placeholders?.[0] || "Software Engineer"}
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) =>
                                    updateExperience(exp.id || '', {
                                      company: e.target.value,
                                    })
                                  }
                                  placeholder="Google"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  value={exp.startDate}
                                  onChange={(e) =>
                                    updateExperience(exp.id || '', {
                                      startDate: e.target.value,
                                    })
                                  }
                                  placeholder="2020-01"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  value={exp.endDate || ''}
                                  onChange={(e) =>
                                    updateExperience(exp.id || '', {
                                      endDate: e.target.value,
                                    })
                                  }
                                  placeholder="Present"
                                  disabled={exp.current}
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <Input
                                  value={exp.location || ''}
                                  onChange={(e) =>
                                    updateExperience(exp.id || '', {
                                      location: e.target.value,
                                    })
                                  }
                                  placeholder="San Francisco, CA"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                value={exp.description || ''}
                                onChange={(e) =>
                                  updateExperience(exp.id || '', {
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Describe your key achievements and responsibilities..."
                                className="min-h-[80px] bg-secondary/50 border-border/50"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Button
                    variant="outline"
                    onClick={handleAddExperience}
                    className="w-full gap-1.5 border-dashed"
                  >
                    <Plus className="size-4" />
                    Add Experience
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants}>
            <Collapsible
              open={openSections.education}
              onOpenChange={() => toggleSection('education')}
            >
              <SectionHeader
                icon={GraduationCap}
                title="Education"
                required={isSectionRequired('education')}
                open={openSections.education}
                count={education.length}
              />
              <CollapsibleContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {education.map((edu, index) => (
                      <motion.div
                        key={edu.id || index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="border-border/30">
                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Education {index + 1}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeEducation(edu.id || '')}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) =>
                                    updateEducation(edu.id || '', {
                                      institution: e.target.value,
                                    })
                                  }
                                  placeholder="Stanford University"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) =>
                                    updateEducation(edu.id || '', {
                                      degree: e.target.value,
                                    })
                                  }
                                  placeholder="Bachelor of Science"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                              <div className="space-y-2">
                                <Label>Field of Study</Label>
                                <Input
                                  value={edu.field || ''}
                                  onChange={(e) =>
                                    updateEducation(edu.id || '', {
                                      field: e.target.value,
                                    })
                                  }
                                  placeholder="Computer Science"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  value={edu.startDate}
                                  onChange={(e) =>
                                    updateEducation(edu.id || '', {
                                      startDate: e.target.value,
                                    })
                                  }
                                  placeholder="2016-09"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  value={edu.endDate || ''}
                                  onChange={(e) =>
                                    updateEducation(edu.id || '', {
                                      endDate: e.target.value,
                                    })
                                  }
                                  placeholder="2020-06"
                                  className="bg-secondary/50 border-border/50"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Button
                    variant="outline"
                    onClick={handleAddEducation}
                    className="w-full gap-1.5 border-dashed"
                  >
                    <Plus className="size-4" />
                    Add Education
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <Collapsible
              open={openSections.skills}
              onOpenChange={() => toggleSection('skills')}
            >
              <SectionHeader
                icon={Lightbulb}
                title="Skills"
                required={isSectionRequired('skills')}
                open={openSections.skills}
                count={skills.length}
              />
              <CollapsibleContent>
                <Card className="border-border/30">
                  <CardContent className="p-6 space-y-4">
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                          <Badge
                            key={skill.id || i}
                            variant="secondary"
                            className="gap-1.5 pr-1 bg-primary/10 text-primary border-primary/20"
                          >
                            {skill.name}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill.id || '')}
                              className="ml-1 rounded-full p-0.5 hover:bg-primary/20 transition-colors"
                            >
                              <Trash2 className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                        placeholder="Add a skill..."
                        className="bg-secondary/50 border-border/50"
                      />
                      <Button
                        onClick={handleAddSkill}
                        variant="outline"
                        size="icon"
                        disabled={!newSkill.trim()}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                    {jobAnalysis?.relevantSkills?.length && skills.length === 0 && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Sparkles className="size-3 text-primary" />
                        AI has pre-filled recommended skills for your target role
                      </p>
                    )}
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Dynamic Sections from AI Analysis */}
          {getDynamicSections().map((section) => {
            const Icon = sectionIcons[section.section] || FileText;
            return (
              <motion.div key={section.section} variants={itemVariants}>
                <Collapsible
                  open={openSections[section.section]}
                  onOpenChange={() => toggleSection(section.section)}
                >
                  <SectionHeader
                    icon={Icon}
                    title={section.label}
                    required={section.required}
                    open={openSections[section.section] || false}
                    hint={section.description}
                  />
                  <CollapsibleContent>
                    <Card className="border-border/30">
                      <CardContent className="p-6 space-y-4">
                        {/* Certifications */}
                        {section.section === 'certifications' && (
                          <>
                            {certifications.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {certifications.map((cert, i) => (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="gap-1.5 pr-1"
                                  >
                                    {cert}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setCertifications((prev) =>
                                          prev.filter((_, j) => j !== i)
                                        )
                                      }
                                      className="ml-1 rounded-full p-0.5 hover:bg-secondary transition-colors"
                                    >
                                      <Trash2 className="size-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Input
                                value={newCertification}
                                onChange={(e) =>
                                  setNewCertification(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  e.key === 'Enter' && handleAddCertification()
                                }
                                placeholder={
                                  section.placeholders?.[0] || 'Add certification...'
                                }
                                className="bg-secondary/50 border-border/50"
                              />
                              <Button
                                onClick={handleAddCertification}
                                variant="outline"
                                size="icon"
                                disabled={!newCertification.trim()}
                              >
                                <Plus className="size-4" />
                              </Button>
                            </div>
                          </>
                        )}

                        {/* Projects */}
                        {section.section === 'projects' && (
                          <>
                            {projects.length > 0 && (
                              <div className="space-y-3">
                                {projects.map((proj, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start justify-between rounded-md border border-border/40 p-3"
                                  >
                                    <div>
                                      <p className="text-sm font-medium">
                                        {proj.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {proj.description}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                                      onClick={() =>
                                        setProjects((prev) =>
                                          prev.filter((_, j) => j !== i)
                                        )
                                      }
                                    >
                                      <Trash2 className="size-3.5" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="space-y-3">
                              <Input
                                value={newProject.name}
                                onChange={(e) =>
                                  setNewProject((p) => ({
                                    ...p,
                                    name: e.target.value,
                                  }))
                                }
                                placeholder="Project name"
                                className="bg-secondary/50 border-border/50"
                              />
                              <Input
                                value={newProject.description}
                                onChange={(e) =>
                                  setNewProject((p) => ({
                                    ...p,
                                    description: e.target.value,
                                  }))
                                }
                                placeholder="Brief description"
                                className="bg-secondary/50 border-border/50"
                              />
                              <Button
                                onClick={handleAddProject}
                                variant="outline"
                                className="gap-1.5"
                                disabled={!newProject.name.trim()}
                              >
                                <Plus className="size-4" />
                                Add Project
                              </Button>
                            </div>
                          </>
                        )}

                        {/* Languages */}
                        {section.section === 'languages' && (
                          <>
                            {languages.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {languages.map((lang, i) => (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="gap-1.5 pr-1"
                                  >
                                    {lang}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setLanguages((prev) =>
                                          prev.filter((_, j) => j !== i)
                                        )
                                      }
                                      className="ml-1 rounded-full p-0.5 hover:bg-secondary transition-colors"
                                    >
                                      <Trash2 className="size-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Input
                                value={newLanguage}
                                onChange={(e) =>
                                  setNewLanguage(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  e.key === 'Enter' && handleAddLanguage()
                                }
                                placeholder="Add language..."
                                className="bg-secondary/50 border-border/50"
                              />
                              <Button
                                onClick={handleAddLanguage}
                                variant="outline"
                                size="icon"
                                disabled={!newLanguage.trim()}
                              >
                                <Plus className="size-4" />
                              </Button>
                            </div>
                          </>
                        )}

                        {/* Volunteer */}
                        {section.section === 'volunteer' && (
                          <Textarea
                            value={volunteerInfo}
                            onChange={(e) => setVolunteerInfo(e.target.value)}
                            placeholder={
                              section.placeholders?.[0] ||
                              'Describe your volunteer experience...'
                            }
                            className="min-h-[80px] bg-secondary/50 border-border/50"
                          />
                        )}
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            );
          })}

          {/* Continue Button */}
          <motion.div variants={itemVariants} className="pt-4 pb-8">
            <Button
              onClick={handleContinue}
              className="w-full gap-2 py-6 text-base"
              size="lg"
            >
              <Sparkles className="size-5" />
              AI Polish My Resume
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-auto">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <FileText className="size-3.5 text-primary" />
            <span>
              Resu<span className="text-primary">Me</span> AI
            </span>
            <span>&middot;</span>
            <span>AI-Powered Resume Builder</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Section Header Component ────────────────────────────────
function SectionHeader({
  icon: Icon,
  title,
  required,
  open,
  count,
  hint,
}: {
  icon: React.ElementType;
  title: string;
  required: boolean;
  open: boolean;
  count?: number;
  hint?: string;
}) {
  return (
    <CollapsibleTrigger asChild>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
            <Icon className="size-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{title}</span>
            {required && (
              <span className="text-xs text-primary font-medium">Required</span>
            )}
            {count !== undefined && count > 0 && (
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {count}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hint && (
            <span className="text-xs text-muted-foreground hidden sm:block">
              {hint}
            </span>
          )}
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
    </CollapsibleTrigger>
  );
}
