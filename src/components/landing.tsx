'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, FileText, Pencil, ArrowRight, FileText as FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useSession } from 'next-auth/react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.55, ease: 'easeOut' },
  }),
};

const features = [
  {
    icon: MessageSquare,
    title: 'AI Understands Your Job',
    description:
      'Describe the job you want, and AI creates the perfect resume structure',
  },
  {
    icon: FileText,
    title: 'Smart Form Generation',
    description:
      'AI shows only the fields that matter for your target role',
  },
  {
    icon: Pencil,
    title: 'AI-Polished Content',
    description:
      'AI reads your info and writes compelling, job-specific content',
  },
];

export default function Landing() {
  const { setAuthDialog, setView } = useAppStore();
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (session) {
      setView('dashboard');
    } else {
      setAuthDialog(true, 'signup');
    }
  };

  const handleSignIn = () => {
    if (session) {
      setView('dashboard');
    } else {
      setAuthDialog(true, 'login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="size-4" />
            AI-Powered Resume Builder
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.12]"
        >
          Build the Perfect Resume{' '}
          <span className="text-primary">with AI</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
        >
          Tell AI about your dream job, and we&apos;ll craft a tailored resume
          that gets you hired
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="text-base px-8 py-6 gap-2"
          >
            Get Started Free
            <ArrowRight className="size-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleSignIn}
            className="text-base px-8 py-6"
          >
            Sign In
          </Button>
        </motion.div>
      </main>

      {/* ── Feature Cards ───────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={4 + i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Card className="h-full border-border/30 bg-card/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileTextIcon className="size-4 text-primary" />
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
