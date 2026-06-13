'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  FileText,
  Pencil,
  ArrowRight,
  Zap,
  Users,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useSession } from 'next-auth/react';

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

// ── Feature cards ────────────────────────────────────────────
const features = [
  {
    icon: MessageSquare,
    title: 'Chat with AI',
    description:
      'Describe your target job and background. AI extracts your info and asks for confirmation before saving anything.',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    icon: FileText,
    title: 'Confirm Before Save',
    description:
      'AI never auto-saves. You review, edit, or reject every piece of extracted information. Full control is yours.',
    gradient: 'from-sky-500/20 to-sky-600/5',
  },
  {
    icon: Pencil,
    title: 'Professional Templates',
    description:
      'Choose from 6 beautiful resume templates. AI helps tailor your content for each job application.',
    gradient: 'from-amber-500/20 to-amber-600/5',
  },
];

// ── Animated counter ─────────────────────────────────────────
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v: number) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

// ── Component ────────────────────────────────────────────────
export default function Landing() {
  const { setAuthDialog, setRoute } = useAppStore();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (session) {
      setRoute('/dashboard');
    } else {
      setAuthDialog(true, 'signup');
    }
  };

  const handleSignIn = () => {
    if (session) {
      setRoute('/dashboard');
    } else {
      setAuthDialog(true, 'login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Top Navigation ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              ResuMe<span className="text-primary">AI</span>
            </span>
          </div>

          {/* Desktop nav buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignIn}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button size="sm" onClick={handleGetStarted} className="gap-2">
              Get Started
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:hidden border-t border-border/30 bg-background px-4 py-4 space-y-3"
          >
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                handleSignIn();
                setMobileMenuOpen(false);
              }}
            >
              Sign In
            </Button>
            <Button
              className="w-full gap-2"
              onClick={() => {
                handleGetStarted();
                setMobileMenuOpen(false);
              }}
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        )}
      </header>

      {/* ── Hero Section ────────────────────────────────────── */}
      <main className="flex-1">
        <section className="px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="size-3.5" />
                AI-Powered Resume Builder
              </div>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
              Build the Perfect Resume{' '}
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                with AI
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Chat with AI, confirm your details, and get a tailored resume — you review everything before it&apos;s saved.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="text-base px-8 py-6 gap-2 shadow-lg shadow-primary/20"
              >
                Get Started Free
                <ArrowRight className="size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSignIn}
                className="text-base px-8 py-6 border-border/50"
              >
                Sign In
              </Button>
            </motion.div>

            {/* Quick trust indicator */}
            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2"
            >
              <Zap className="size-4 text-primary" />
              Free to start — no credit card required
            </motion.p>
          </div>
        </section>

        {/* ── Feature Cards ─────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-20 sm:pb-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                How it works
              </h2>
              <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
                Chat, confirm, create — your perfect resume in three steps
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={6 + i}
                  initial="hidden"
                  animate="visible"
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full border-border/30 bg-card/50 hover:border-primary/30 transition-all overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-primary`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social Proof ──────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-20 sm:pb-28">
          <motion.div
            custom={9}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="mx-auto max-w-3xl"
          >
            <Card className="border-border/30 bg-card/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <CardContent className="relative p-8 sm:p-12 text-center space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <Users className="size-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    Trusted by Professionals
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Join{' '}
                  <span className="text-primary">
                    <AnimatedCounter value={1000} suffix="+" />
                  </span>{' '}
                  professionals
                </h3>

                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  From recent grads to seasoned executives, thousands trust ResuMe AI
                  to craft resumes that land interviews.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold">
                      <AnimatedCounter value={5000} suffix="+" />
                    </span>
                    <span className="text-xs text-muted-foreground">Resumes Created</span>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-border/50" />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold">
                      <AnimatedCounter value={94} suffix="%" />
                    </span>
                    <span className="text-xs text-muted-foreground">Satisfaction Rate</span>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-border/50" />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold">
                      <AnimatedCounter value={3} suffix="x" />
                    </span>
                    <span className="text-xs text-muted-foreground">More Interviews</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* ── CTA Section ───────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-20 sm:pb-28">
          <motion.div
            custom={11}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to build your resume?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start for free and let AI help you create a resume that stands out from the crowd.
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="text-base px-8 py-6 gap-2 shadow-lg shadow-primary/20"
            >
              Get Started Free
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
