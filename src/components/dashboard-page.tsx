'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import {
  Plus,
  User,
  FileText,
  Trash2,
  LogOut,
  Loader2,
  Sparkles,
  MessageSquare,
  LayoutDashboard,
  CheckCircle2,
  Eye,
  Clock,
  ChevronRight,
  Settings,
} from 'lucide-react';
import type { ResumeData } from '@/lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function DashboardPage() {
  const {
    profile,
    setProfile,
    experiences,
    setExperiences,
    education,
    setEducation,
    skills,
    setSkills,
    resumes,
    setResumes,
    setCurrentResume,
    setRoute,
  } = useAppStore();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch profile & resumes ────────────────────────────────
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
          image: p.image ?? '',
        });
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
    }
  }, [setProfile, setExperiences, setEducation, setSkills]);

  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch('/api/resume');
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      }
    } catch {
      // silent
    }
  }, [setResumes]);

  useEffect(() => {
    Promise.all([fetchProfile(), fetchResumes()]).finally(() => setLoading(false));
  }, [fetchProfile, fetchResumes]);

  // ── Profile completion ──────────────────────────────────────
  const profileCompletion = useMemo(() => {
    if (!profile) return 0;
    const fields = [
      profile.firstName, profile.lastName, profile.jobTitle,
      profile.email, profile.phone, profile.location, profile.summary, profile.hobbies,
    ];
    const filled = fields.filter(Boolean).length;
    const bonus = (experiences.length > 0 ? 1 : 0) + (education.length > 0 ? 1 : 0) + (skills.length > 0 ? 1 : 0);
    return Math.min(100, Math.round(((filled + bonus) / 11) * 100));
  }, [profile, experiences, education, skills]);

  // ── Delete resume ───────────────────────────────────────────
  const handleDeleteResume = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTarget }),
      });
      if (res.ok) {
        toast.success('Resume deleted');
        await fetchResumes();
      } else {
        toast.error('Failed to delete');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }, [deleteTarget, fetchResumes]);

  // ── Open resume ─────────────────────────────────────────────
  const handleOpenResume = useCallback((resume: ResumeData) => {
    setCurrentResume(resume);
    setRoute('/resume');
  }, [setCurrentResume, setRoute]);

  const displayName = profile ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') || session?.user?.name || 'User' : session?.user?.name || 'User';

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <LayoutDashboard className="size-4 text-primary" />
            </div>
            <h1 className="text-base font-semibold tracking-tight">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={() => setRoute('/profile')}>
              <Settings className="size-3.5" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="size-7">
                    {profile?.image && <AvatarImage src={profile.image} alt={displayName} />}
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">{displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setRoute('/profile')}>
                  <User className="size-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6 sm:px-6 sm:py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Welcome section */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {displayName.split(' ')[0]} 👋
            </h2>
            <p className="text-muted-foreground mt-1">
              Ready to build your next resume? Let AI help you craft the perfect one.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card
              className="cursor-pointer border-primary/20 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all group"
              onClick={() => setRoute('/chat')}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Chat with AI</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Describe your target job and let AI build your resume
                  </p>
                </div>
                <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors ml-auto shrink-0 mt-1" />
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer border-border/30 hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => setRoute('/profile')}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <User className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Profile</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Update your personal info, experience, and skills
                  </p>
                </div>
                <ChevronRight className="size-5 text-muted-foreground group-hover:text-sky-500 transition-colors ml-auto shrink-0 mt-1" />
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer border-border/30 hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => setRoute('/templates')}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <FileText className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Browse Templates</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Choose from 6 professional resume templates
                  </p>
                </div>
                <ChevronRight className="size-5 text-muted-foreground group-hover:text-amber-500 transition-colors ml-auto shrink-0 mt-1" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Completion */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="border-border/30">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span className="text-sm font-medium">Profile Completion</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
                <div className="flex flex-wrap gap-2 mt-3">
                  {!profile?.firstName && <Badge variant="outline" className="text-[10px]">+ Name</Badge>}
                  {!profile?.email && <Badge variant="outline" className="text-[10px]">+ Email</Badge>}
                  {!profile?.summary && <Badge variant="outline" className="text-[10px]">+ Summary</Badge>}
                  {!profile?.hobbies && <Badge variant="outline" className="text-[10px]">+ Hobbies</Badge>}
                  {experiences.length === 0 && <Badge variant="outline" className="text-[10px]">+ Experience</Badge>}
                  {education.length === 0 && <Badge variant="outline" className="text-[10px]">+ Education</Badge>}
                  {skills.length === 0 && <Badge variant="outline" className="text-[10px]">+ Skills</Badge>}
                  {profileCompletion === 100 && (
                    <Badge className="text-[10px] gap-1 bg-emerald-500/15 text-emerald-500 border-emerald-500/20">
                      <CheckCircle2 className="size-3" /> Complete!
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resumes list */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Resumes</h3>
              {resumes.length > 0 && (
                <Button size="sm" className="gap-1.5" onClick={() => setRoute('/chat')}>
                  <Plus className="size-3.5" />
                  New Resume
                </Button>
              )}
            </div>

            {resumes.length === 0 ? (
              <Card className="border-dashed border-border/40">
                <CardContent className="p-8 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
                    <Sparkles className="size-7 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-1">No resumes yet</h4>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                    Start a conversation with AI to create your first resume. It&apos;ll guide you through everything.
                  </p>
                  <Button className="gap-2" onClick={() => setRoute('/chat')}>
                    <MessageSquare className="size-4" />
                    Start Chatting with AI
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <Card
                    key={resume.id}
                    className="cursor-pointer border-border/30 hover:border-primary/30 hover:shadow-md transition-all group"
                    onClick={() => handleOpenResume(resume)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium truncate">{resume.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                          onClick={(e) => { e.stopPropagation(); setDeleteTarget(resume.id!); }}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                      {resume.targetJobTitle && (
                        <CardDescription className="text-xs truncate">{resume.targetJobTitle}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Eye className="size-3" />
                          {resume.templateId}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3" />
                          {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : 'Just now'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The resume will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteResume} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
