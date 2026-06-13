'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Plus,
  Trash2,
  Save,
  Loader2,
  Pencil,
  Check,
  X,
  FileText,
  MessageSquare,
  Sparkles,
  Bot,
} from 'lucide-react';
import type { ProfileData, ExperienceData, EducationData, SkillData } from '@/lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProfilePage() {
  const {
    profile,
    setProfile,
    experiences,
    setExperiences,
    addExperience,
    removeExperience,
    education,
    setEducation,
    addEducation,
    removeEducation,
    skills,
    setSkills,
    addSkill,
    removeSkill,
    setRoute,
  } = useAppStore();
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Local edit state for profile
  const [editProfile, setEditProfile] = useState<ProfileData>({});

  // New entry states
  const [newSkill, setNewSkill] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillData['category']>('technical');

  // Fetch profile
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        const p = data.profile;
        const profileData: ProfileData = {
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
          hobbies: p.hobbies ?? '',
        };
        setProfile(profileData);
        setEditProfile(profileData);
        setExperiences(
          (p.experiences ?? []).map((e: Record<string, unknown>) => ({
            id: e.id as string,
            company: (e.company as string) ?? '',
            position: (e.position as string) ?? '',
            location: (e.location as string) ?? '',
            startDate: (e.startDate as string) ?? '',
            endDate: (e.endDate as string) ?? '',
            current: (e.current as boolean) ?? false,
            description: (e.description as string) ?? '',
            order: (e.order as number) ?? 0,
          }))
        );
        setEducation(
          (p.education ?? []).map((e: Record<string, unknown>) => ({
            id: e.id as string,
            institution: (e.institution as string) ?? '',
            degree: (e.degree as string) ?? '',
            field: (e.field as string) ?? '',
            location: (e.location as string) ?? '',
            startDate: (e.startDate as string) ?? '',
            endDate: (e.endDate as string) ?? '',
            gpa: (e.gpa as string) ?? '',
            description: (e.description as string) ?? '',
            order: (e.order as number) ?? 0,
          }))
        );
        setSkills(
          (p.skills ?? []).map((s: Record<string, unknown>) => ({
            id: s.id as string,
            name: (s.name as string) ?? '',
            category: (s.category as 'technical' | 'soft' | 'language' | 'other') ?? 'technical',
            order: (s.order as number) ?? 0,
          }))
        );
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [setProfile, setExperiences, setEducation, setSkills]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Save profile
  const handleSaveProfile = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProfile),
      });
      if (res.ok) {
        setProfile(editProfile);
        toast.success('Profile saved!');
      } else {
        toast.error('Failed to save profile');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  }, [editProfile, setProfile]);

  // Add skill
  const handleAddSkill = useCallback(async () => {
    if (!newSkill.trim()) return;
    try {
      const res = await fetch('/api/profile/skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSkill.trim(), category: newSkillCategory }),
      });
      if (res.ok) {
        const data = await res.json();
        addSkill({ id: data.skill.id, name: newSkill.trim(), category: newSkillCategory, order: skills.length });
        setNewSkill('');
        toast.success('Skill added');
      }
    } catch {
      toast.error('Failed to add skill');
    }
  }, [newSkill, newSkillCategory, skills.length, addSkill]);

  // Delete skill
  const handleDeleteSkill = useCallback(async (id: string) => {
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
      toast.error('Failed to remove skill');
    }
  }, [removeSkill]);

  // Delete experience
  const handleDeleteExperience = useCallback(async (id: string) => {
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
      toast.error('Failed to remove');
    }
  }, [removeExperience]);

  // Delete education
  const handleDeleteEducation = useCallback(async (id: string) => {
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
      toast.error('Failed to remove');
    }
  }, [removeEducation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = [editProfile.firstName, editProfile.lastName].filter(Boolean).join(' ') || session?.user?.name || 'User';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setRoute('/dashboard')}>
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                <User className="size-4 text-primary" />
              </div>
              <h1 className="text-base font-semibold">Profile</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setRoute('/chat')}>
              <MessageSquare className="size-3.5" />
              <span className="hidden sm:inline">Update via Chat</span>
            </Button>
            <Button size="sm" className="gap-1.5 text-xs" onClick={handleSaveProfile} disabled={saving}>
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6 sm:px-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* AI Engineer CTA Banner */}
          <motion.div variants={itemVariants}>
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
              <CardContent className="p-5 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 shrink-0">
                    <Bot className="size-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">Need help building your resume?</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Chat with our AI Engineer to optimize your profile, target a specific job, and generate a perfect resume.</p>
                  </div>
                  <Button className="gap-2 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setRoute('/chat')}>
                    <Sparkles className="size-4" />
                    Find an AI Engineer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personal Info */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <User className="size-5 text-primary" />
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </div>
                <CardDescription>Your basic contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs">First Name</Label>
                    <Input id="firstName" value={editProfile.firstName || ''} onChange={(e) => setEditProfile({ ...editProfile, firstName: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                    <Input id="lastName" value={editProfile.lastName || ''} onChange={(e) => setEditProfile({ ...editProfile, lastName: e.target.value })} className="text-sm" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-xs">Job Title</Label>
                    <Input id="jobTitle" value={editProfile.jobTitle || ''} onChange={(e) => setEditProfile({ ...editProfile, jobTitle: e.target.value })} className="text-sm" placeholder="e.g., Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs">Email</Label>
                    <Input id="email" type="email" value={editProfile.email || ''} onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })} className="text-sm" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">Phone</Label>
                    <Input id="phone" value={editProfile.phone || ''} onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-xs">Location</Label>
                    <Input id="location" value={editProfile.location || ''} onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })} className="text-sm" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-xs">Website</Label>
                    <Input id="website" value={editProfile.website || ''} onChange={(e) => setEditProfile({ ...editProfile, website: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-xs">LinkedIn</Label>
                    <Input id="linkedin" value={editProfile.linkedin || ''} onChange={(e) => setEditProfile({ ...editProfile, linkedin: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-xs">GitHub</Label>
                    <Input id="github" value={editProfile.github || ''} onChange={(e) => setEditProfile({ ...editProfile, github: e.target.value })} className="text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-xs">Professional Summary</Label>
                  <Textarea id="summary" value={editProfile.summary || ''} onChange={(e) => setEditProfile({ ...editProfile, summary: e.target.value })} className="text-sm min-h-[80px] resize-none" placeholder="Brief summary of your professional background..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hobbies" className="text-xs">Hobbies & Interests</Label>
                  <Textarea id="hobbies" value={editProfile.hobbies || ''} onChange={(e) => setEditProfile({ ...editProfile, hobbies: e.target.value })} className="text-sm min-h-[60px] resize-none" placeholder="Photography, Travel, Chess, Reading..." />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-5 text-primary" />
                    <CardTitle className="text-base">Work Experience</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">{experiences.length}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setRoute('/chat')}>
                    <MessageSquare className="size-3" /> Add via Chat
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {experiences.length === 0 ? (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    <Briefcase className="size-8 mx-auto mb-2 opacity-30" />
                    No experience added yet. Chat with AI to add your work experience.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="flex items-start justify-between p-3 rounded-lg border border-border/20 bg-background/30">
                        <div className="min-w-0">
                          <div className="font-medium text-sm">{exp.position}</div>
                          <div className="text-xs text-muted-foreground">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            {exp.startDate} — {exp.current ? 'Present' : exp.endDate || 'N/A'}
                          </div>
                          {exp.description && (
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{exp.description}</div>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="size-7 text-destructive hover:bg-destructive/10 shrink-0" onClick={() => exp.id && handleDeleteExperience(exp.id)}>
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-5 text-primary" />
                    <CardTitle className="text-base">Education</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">{education.length}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setRoute('/chat')}>
                    <MessageSquare className="size-3" /> Add via Chat
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {education.length === 0 ? (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    <GraduationCap className="size-8 mx-auto mb-2 opacity-30" />
                    No education added yet. Chat with AI to add your education.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex items-start justify-between p-3 rounded-lg border border-border/20 bg-background/30">
                        <div className="min-w-0">
                          <div className="font-medium text-sm">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                          <div className="text-xs text-muted-foreground">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{edu.startDate} — {edu.endDate || 'N/A'}</div>
                        </div>
                        <Button variant="ghost" size="icon" className="size-7 text-destructive hover:bg-destructive/10 shrink-0" onClick={() => edu.id && handleDeleteEducation(edu.id)}>
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Wrench className="size-5 text-primary" />
                  <CardTitle className="text-base">Skills</CardTitle>
                  <Badge variant="secondary" className="text-[10px]">{skills.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="gap-1 text-xs py-1 px-2.5 pr-1 group"
                      >
                        <span>{skill.name}</span>
                        <span className="text-[9px] text-muted-foreground">({skill.category})</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-4 text-muted-foreground hover:text-destructive ml-0.5"
                          onClick={() => skill.id && handleDeleteSkill(skill.id)}
                        >
                          <X className="size-2.5" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add skill */}
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as SkillData['category'])}
                    className="rounded-md border border-input bg-background px-2 text-xs"
                  >
                    <option value="technical">Technical</option>
                    <option value="soft">Soft</option>
                    <option value="language">Language</option>
                    <option value="other">Other</option>
                  </select>
                  <Button size="icon" onClick={handleAddSkill} disabled={!newSkill.trim()}>
                    <Plus className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
