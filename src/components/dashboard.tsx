'use client';

import { useEffect, useState, useCallback } from 'react';
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
} from 'lucide-react';
import type { ResumeData } from '@/lib/types';

// ── Animation variants ──────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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
    // Reset AI flow state
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
      : session?.user?.email?.split('@')[0] ?? 'there';

  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              ResuMe<span className="text-primary">AI</span>
            </span>
          </div>

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
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                <LogOut className="size-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome section */}
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, <span className="text-primary">{userName}</span>
            </h1>
            <p className="mt-1 text-muted-foreground">
              Build and manage your professional resumes with AI assistance.
            </p>
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={itemVariants}>
            <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Create New Resume with AI */}
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="cursor-pointer"
                onClick={handleCreateResume}
              >
                <Card className="h-full border-primary/30 bg-primary/5 transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/15">
                        <Sparkles className="size-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Create New Resume with AI</CardTitle>
                        <CardDescription className="mt-0.5">
                          Tell AI about your dream job and get a tailored resume
                        </CardDescription>
                      </div>
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
                <Card className="h-full border-border/50 transition-colors hover:border-primary/40">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                        <MessageSquare className="size-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Quick Build</CardTitle>
                        <CardDescription className="mt-0.5">
                          Skip AI chat and fill in your details directly
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Existing Resumes */}
          <motion.div variants={itemVariants}>
            <h2 className="mb-4 text-lg font-semibold">Your Resumes</h2>

            {resumes.length === 0 ? (
              <Card className="border-dashed border-border/60">
                <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <FolderOpen className="size-7 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">No resumes yet</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create your first AI-powered resume to get started.
                    </p>
                  </div>
                  <Button
                    onClick={handleCreateResume}
                    variant="outline"
                    className="mt-2 gap-1.5"
                  >
                    <Plus className="size-4" />
                    Create Resume
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card
                      className="group cursor-pointer border-border/50 transition-colors hover:border-primary/40"
                      onClick={() => handleEditResume(resume)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
                              <FileText className="size-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="truncate text-base">
                                {resume.title}
                              </CardTitle>
                              <CardDescription className="mt-0.5">
                                Updated {formatDate(resume.updatedAt)}
                              </CardDescription>
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
                        <Badge variant="secondary" className="text-xs">
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
