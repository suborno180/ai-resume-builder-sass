'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Loader2,
  FileText,
  ChevronRight,
} from 'lucide-react';
import type { AIPolishedContent } from '@/lib/types';

// ── Animation variants ──────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function AIPolish() {
  const {
    setView,
    profile,
    experiences,
    education,
    skills,
    targetJobTitle,
    targetJobDescription,
    polishedContent,
    setPolishedContent,
    setProfile,
    setExperiences,
    aiLoading,
    setAiLoading,
  } = useAppStore();

  const [loading, setLoading] = useState(false);
  const [polished, setPolished] = useState<AIPolishedContent | null>(null);
  const [acceptSummary, setAcceptSummary] = useState(true);
  const [acceptSkills, setAcceptSkills] = useState(true);
  const [acceptBullets, setAcceptBullets] = useState<Record<string, boolean>>({});

  // ── If already polished, use stored data ──────────────────
  useEffect(() => {
    if (polishedContent) {
      setPolished(polishedContent);
      initializeAcceptState(polishedContent);
    }
  }, [polishedContent]);

  // ── Auto-start polishing if not already done ──────────────
  useEffect(() => {
    if (!polishedContent && !loading) {
      handlePolish();
    }
  }, []);

  const initializeAcceptState = (data: AIPolishedContent) => {
    setAcceptSummary(true);
    setAcceptSkills(true);
    const bulletState: Record<string, boolean> = {};
    Object.keys(data.experienceBullets || {}).forEach((key) => {
      bulletState[key] = true;
    });
    setAcceptBullets(bulletState);
  };

  // ── Polish the resume ─────────────────────────────────────
  const handlePolish = useCallback(async () => {
    setLoading(true);
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'polish-resume',
          context: {
            profile: profile
              ? {
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  jobTitle: profile.jobTitle,
                  email: profile.email,
                  phone: profile.phone,
                  location: profile.location,
                  website: profile.website,
                  linkedin: profile.linkedin,
                  github: profile.github,
                }
              : null,
            experiences: experiences.map((e) => ({
              id: e.id,
              company: e.company,
              position: e.position,
              description: e.description,
              startDate: e.startDate,
              endDate: e.endDate,
              current: e.current,
            })),
            education: education.map((e) => ({
              id: e.id,
              institution: e.institution,
              degree: e.degree,
              field: e.field,
              startDate: e.startDate,
              endDate: e.endDate,
            })),
            skills: skills.map((s) => ({
              id: s.id,
              name: s.name,
              category: s.category,
            })),
            jobTitle: targetJobTitle,
            jobDescription: targetJobDescription,
            summary: profile?.summary,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.content;

        if (content && content.summary) {
          setPolished(content);
          setPolishedContent(content);
          initializeAcceptState(content);
          toast.success('Resume polished successfully!');
        } else {
          toast.error('AI returned unexpected format. Please try again.');
          setPolished({
            summary: profile?.summary || '',
            experienceBullets: {},
            skills: skills.map((s) => ({ name: s.name, category: s.category })),
            suggestedTemplate: 'modern',
            suggestedTemplateReason: 'A clean, modern template works well for most roles.',
          });
          setPolishedContent(null);
        }
      } else {
        toast.error('Failed to polish resume. Please try again.');
        // Fallback to allow continuing
        setPolished({
          summary: profile?.summary || '',
          experienceBullets: {},
          skills: skills.map((s) => ({ name: s.name, category: s.category })),
          suggestedTemplate: 'modern',
          suggestedTemplateReason: 'A clean, modern template works well for most roles.',
        });
      }
    } catch {
      toast.error('Something went wrong');
      setPolished({
        summary: profile?.summary || '',
        experienceBullets: {},
        skills: skills.map((s) => ({ name: s.name, category: s.category })),
        suggestedTemplate: 'modern',
        suggestedTemplateReason: 'A clean, modern template works well for most roles.',
      });
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  }, [profile, experiences, education, skills, targetJobTitle, targetJobDescription, setPolishedContent, setAiLoading]);

  // ── Apply accepted changes ────────────────────────────────
  const handleApplyAndContinue = () => {
    if (!polished) return;

    // Apply polished summary if accepted
    if (acceptSummary && polished.summary && profile) {
      setProfile({ ...profile, summary: polished.summary });
    }

    // Apply polished bullets to experiences
    if (acceptBullets && Object.keys(acceptBullets).length > 0) {
      const updatedExperiences = experiences.map((exp) => {
        const expId = exp.id || '0';
        const index = String(experiences.indexOf(exp));
        const key = polished.experienceBullets[expId]
          ? expId
          : polished.experienceBullets[index]
          ? index
          : null;

        if (key && acceptBullets[key] && polished.experienceBullets[key]) {
          return {
            ...exp,
            description: polished.experienceBullets[key].join('\n'),
          };
        }
        return exp;
      });
      setExperiences(updatedExperiences);
    }

    setView('templates');
  };

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-10 text-primary" />
            </div>
            <div className="absolute inset-0 size-20 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">AI is crafting your perfect resume...</h2>
            <p className="text-sm text-muted-foreground">
              Analyzing your experience and optimizing content for {targetJobTitle || 'your target role'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            This may take a moment
          </div>
        </motion.div>
      </div>
    );
  }

  if (!polished) return null;

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
              onClick={() => setView('smart-form')}
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to Form</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="size-4 text-primary" />
              </div>
              <h1 className="text-base font-semibold tracking-tight">
                AI Polish
              </h1>
            </div>
          </div>
          <Badge className="gap-1.5 bg-primary/15 text-primary border-primary/20">
            <Sparkles className="size-3.5" />
            Review Changes
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* AI Recommendation */}
          {polished.suggestedTemplate && (
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">
                        AI Recommends: {polished.suggestedTemplate.charAt(0).toUpperCase() + polished.suggestedTemplate.slice(1)} Template
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {polished.suggestedTemplateReason}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Summary Comparison */}
          {(profile?.summary || polished.summary) && (
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                Professional Summary
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Original */}
                <Card className="border-border/30">
                  <CardContent className="p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Original
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {profile?.summary || 'No summary provided'}
                    </p>
                  </CardContent>
                </Card>
                {/* Polished */}
                <Card className={`border-border/30 ${acceptSummary ? 'border-primary/30 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-primary flex items-center gap-1">
                        <Sparkles className="size-3" />
                        AI Polished
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setAcceptSummary(true)}
                          className={`rounded-full p-1 transition-colors ${
                            acceptSummary
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-secondary'
                          }`}
                        >
                          <Check className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setAcceptSummary(false)}
                          className={`rounded-full p-1 transition-colors ${
                            !acceptSummary
                              ? 'bg-destructive text-white'
                              : 'text-muted-foreground hover:bg-secondary'
                          }`}
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {polished.summary || 'No AI suggestion available'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Experience Bullets Comparison */}
          {experiences.length > 0 && Object.keys(polished.experienceBullets).length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                Experience Bullet Points
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, index) => {
                  const key = polished.experienceBullets[exp.id || '']
                    ? exp.id || ''
                    : polished.experienceBullets[String(index)]
                    ? String(index)
                    : null;
                  const aiBullets = key ? polished.experienceBullets[key] : null;

                  if (!aiBullets) return null;

                  return (
                    <div key={exp.id || index} className="space-y-2">
                      <p className="text-sm font-medium">
                        {exp.position || `Experience ${index + 1}`}
                        {exp.company ? ` at ${exp.company}` : ''}
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Original */}
                        <Card className="border-border/30">
                          <CardContent className="p-4">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Original
                            </p>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">
                              {exp.description || 'No description provided'}
                            </p>
                          </CardContent>
                        </Card>
                        {/* Polished */}
                        <Card className={`border-border/30 ${acceptBullets[key || ''] ? 'border-primary/30 bg-primary/5' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-medium text-primary flex items-center gap-1">
                                <Sparkles className="size-3" />
                                AI Polished
                              </p>
                              {key && (
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setAcceptBullets((prev) => ({
                                        ...prev,
                                        [key]: true,
                                      }))
                                    }
                                    className={`rounded-full p-1 transition-colors ${
                                      acceptBullets[key]
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-secondary'
                                    }`}
                                  >
                                    <Check className="size-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setAcceptBullets((prev) => ({
                                        ...prev,
                                        [key]: false,
                                      }))
                                    }
                                    className={`rounded-full p-1 transition-colors ${
                                      !acceptBullets[key]
                                        ? 'bg-destructive text-white'
                                        : 'text-muted-foreground hover:bg-secondary'
                                    }`}
                                  >
                                    <X className="size-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <ul className="text-sm space-y-1">
                              {aiBullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Skills Comparison */}
          {(skills.length > 0 || polished.skills?.length > 0) && (
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                Skills
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Original */}
                <Card className="border-border/30">
                  <CardContent className="p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Original Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Polished */}
                <Card className={`border-border/30 ${acceptSkills ? 'border-primary/30 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-primary flex items-center gap-1">
                        <Sparkles className="size-3" />
                        AI Optimized Skills
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setAcceptSkills(true)}
                          className={`rounded-full p-1 transition-colors ${
                            acceptSkills
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-secondary'
                          }`}
                        >
                          <Check className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setAcceptSkills(false)}
                          className={`rounded-full p-1 transition-colors ${
                            !acceptSkills
                              ? 'bg-destructive text-white'
                              : 'text-muted-foreground hover:bg-secondary'
                          }`}
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {polished.skills?.map((s, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {s.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.div variants={itemVariants} className="pt-4 pb-8">
            <Button
              onClick={handleApplyAndContinue}
              className="w-full gap-2 py-6 text-base"
              size="lg"
            >
              Continue to Templates
              <ChevronRight className="size-5" />
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
