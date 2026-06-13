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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  FolderOpen,
  Sparkles,
  MessageSquare,
  LayoutDashboard,
  BarChart3,
  CheckCircle2,
  Eye,
  Clock,
} from 'lucide-react';
import type { ResumeData } from '@/lib/types';

// ── Animation variants ──────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 30px rgba(16,185,129,0.12)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

// ── Template display names ───────────────────────────────────
const templateNames: Record<string, string> = {
  minimal: 'Minimal',
  modern: 'Modern',
  creative: 'Creative',
  professional: 'Professional',
  executive: 'Executive',
  compact: 'Compact',
};

// ── Template badge colors ────────────────────────────────────
const templateColors: Record<string, string> = {
  minimal: 'bg-zinc-500/15 text-zinc-400',
  modern: 'bg-primary/15 text-primary',
  creative: 'bg-amber-500/15 text-amber-400',
  professional: 'bg-sky-500/15 text-sky-400',
  executive: 'bg-rose-500/15 text-rose-400',
  compact: 'bg-violet-500/15 text-violet-400',
};

// ── Component ────────────────────────────────────────────────
export default function Dashboard() {
  const { data: session } = useSession();
  const {
    profile,
    setProfile,
    setExperiences,
    setEducation,
    setSkills,
    resumes,
    setResumes,
    setCurrentResume,
    setView,
    clearChat,
    setJobAnalysis,
    setTargetJobDescription,
    setTargetJobTitle,
    setPolishedContent,
    setSelectedTemplate,
  } = useAppStore();

  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ResumeData | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch profile ─────────────────────────────────────────
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

  // ── Fetch resumes ─────────────────────────────────────────
  const fetchResumes = useCallback(async () => {
    try {
      const res = await fetch('/api/resume');
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      }
    } catch {
      // silently ignore
    }
  }, [setResumes]);

  // ── Initial data fetch ────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchResumes()]);
      setLoading(false);
    };
    load();
  }, [fetchProfile, fetchResumes]);

  // ── Delete resume ─────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (res.ok) {
        toast.success('Resume deleted');
        setResumes(resumes.filter((r) => r.id !== deleteTarget.id));
      } else {
        toast.error('Failed to delete resume');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // ── Navigation helpers ────────────────────────────────────
  const handleCreateResume = () => {
    clearChat();
    setJobAnalysis(null);
    setTargetJobDescription('');
    setTargetJobTitle('');
    setPolishedContent(null);
    setSelectedTemplate('modern');
    setView('ai-chat');
  };

  const handleEditResume = (resume: ResumeData) => {
    setCurrentResume(resume);
    setSelectedTemplate(resume.templateId || 'modern');
    setView('preview');
  };

  // ── Derive user display name ──────────────────────────────
  const userName =
    profile?.firstName || profile?.lastName
      ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
      : (session?.user?.name || session?.user?.email?.split('@')[0]) ?? 'there';

  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // ── Profile completion ────────────────────────────────────
  const profileCompletion = useMemo(() => {
    if (!profile) return 0;
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.jobTitle,
      profile.email,
      profile.phone,
      profile.location,
      profile.summary,
    ];
    const filled = fields.filter((f) => f && f.trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [profile]);

  // ── Format date ───────────────────────────────────────────
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setView('dashboard')}
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="size-5 text-primary" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                ResuMe<span className="text-primary">AI</span>
              </span>
            </div>

            {/* Nav links - hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-primary bg-primary/10"
                onClick={() => setView('dashboard')}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setView('templates')}
              >
                <Eye className="size-4" />
                Templates
              </Button>
            </nav>
          </div>

          {/* Right side: Create button + User menu */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden sm:flex gap-2"
              onClick={handleCreateResume}
            >
              <Plus className="size-4" />
              New Resume
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="size-9 border border-border">
                    <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                      {userInitials || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="sm:hidden gap-2"
                  onClick={handleCreateResume}
                >
                  <Plus className="size-4" />
                  New Resume
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => setView('templates')}
                >
                  <Eye className="size-4" />
                  Templates
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="gap-2"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 flex-1 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* ── Hero Section ──────────────────────────────────── */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, <span className="text-primary">{userName}</span>
            </h1>
            <p className="text-muted-foreground">
              Build and manage your professional resumes with AI assistance.
            </p>
          </motion.div>

          {/* ── Stats Row ─────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Total Resumes */}
              <Card className="border-border/30 bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Resumes</p>
                      <p className="text-3xl font-bold tracking-tight">{resumes.length}</p>
                    </div>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                      <FileText className="size-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card className="border-border/30 bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Profile Completion</p>
                      <p className="text-3xl font-bold tracking-tight">{profileCompletion}%</p>
                    </div>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10">
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    </div>
                  </div>
                  <Progress value={profileCompletion} className="mt-3 h-1.5" />
                </CardContent>
              </Card>

              {/* AI Chats */}
              <Card className="border-border/30 bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">AI Sessions</p>
                      <p className="text-3xl font-bold tracking-tight">
                        {resumes.length > 0 ? resumes.length : 0}
                      </p>
                    </div>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-sky-500/10">
                      <MessageSquare className="size-5 text-sky-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* ── Quick Actions ─────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Chat with AI */}
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="cursor-pointer"
                onClick={handleCreateResume}
              >
                <Card className="h-full border-primary/30 bg-primary/5 transition-colors hover:border-primary/50 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15">
                        <Sparkles className="size-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base">Chat with AI</CardTitle>
                        <CardDescription className="mt-0.5">
                          Describe your dream job and get a tailored resume
                        </CardDescription>
                      </div>
                      <ArrowRightSlim className="size-5 text-primary/60 hidden sm:block" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>

              {/* Quick Build */}
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="cursor-pointer"
                onClick={() => {
                  clearChat();
                  setJobAnalysis(null);
                  setTargetJobDescription('');
                  setTargetJobTitle('');
                  setPolishedContent(null);
                  setSelectedTemplate('modern');
                  setView('smart-form');
                }}
              >
                <Card className="h-full border-border/50 transition-colors hover:border-primary/40 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <CardHeader className="relative">
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                        <BarChart3 className="size-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base">Quick Build</CardTitle>
                        <CardDescription className="mt-0.5">
                          Skip AI chat and fill in your details directly
                        </CardDescription>
                      </div>
                      <ArrowRightSlim className="size-5 text-muted-foreground/40 hidden sm:block" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Existing Resumes ──────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Your Resumes</h2>
              {resumes.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={handleCreateResume}
                >
                  <Plus className="size-3.5" />
                  New
                </Button>
              )}
            </div>

            {resumes.length === 0 ? (
              <Card className="border-dashed border-border/60">
                <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/50">
                    <FolderOpen className="size-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">No resumes yet</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Create your first AI-powered resume to get started. Our AI will help you craft the perfect resume for any job.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Button
                      onClick={handleCreateResume}
                      className="gap-2"
                    >
                      <Sparkles className="size-4" />
                      Create with AI
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        clearChat();
                        setJobAnalysis(null);
                        setTargetJobDescription('');
                        setTargetJobTitle('');
                        setPolishedContent(null);
                        setSelectedTemplate('modern');
                        setView('smart-form');
                      }}
                      className="gap-2"
                    >
                      <BarChart3 className="size-4" />
                      Quick Build
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume, idx) => (
                  <motion.div
                    key={resume.id}
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card
                      className="group cursor-pointer border-border/30 bg-card/50 transition-all hover:border-primary/40 hover:bg-card/80"
                      onClick={() => handleEditResume(resume)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                              <FileText className="size-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="truncate text-base leading-snug">
                                {resume.title}
                              </CardTitle>
                              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                                <Clock className="size-3" />
                                {formatDate(resume.updatedAt)}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(resume);
                            }}
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Delete resume</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${templateColors[resume.templateId] || 'bg-primary/15 text-primary'}`}
                        >
                          {templateNames[resume.templateId] || resume.templateId}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* ── Delete Confirmation Dialog ──────────────────────── */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="size-4 text-primary" />
              <span>
                Resu<span className="text-primary">Me</span> AI
              </span>
              <span className="mx-1">&middot;</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>AI-Powered Resume Builder</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Inline arrow icon (lightweight) ─────────────────────────
function ArrowRightSlim({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
