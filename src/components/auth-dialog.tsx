'use client';

import { useState, useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/lib/store';

export default function AuthDialog() {
  const { authDialogOpen, authMode, setAuthDialog, setView, setProfile, setExperiences, setEducation, setSkills } =
    useAppStore();
  const { data: session } = useSession();

  // ── Login state ──────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ── Signup state ─────────────────────────────────────────
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  const resetForm = useCallback(() => {
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirm('');
    setSignupError('');
  }, []);

  const handleClose = useCallback(
    (open: boolean) => {
      if (!open) {
        resetForm();
      }
      setAuthDialog(open);
    },
    [resetForm, setAuthDialog]
  );

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
      // Silently fail — profile data will be fetched later
    }
  }, [setProfile, setExperiences, setEducation, setSkills]);

  // ── Login handler ────────────────────────────────────────
  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');

      if (!loginEmail || !loginPassword) {
        setLoginError('Please fill in all fields');
        return;
      }

      setLoginLoading(true);
      try {
        const result = await signIn('credentials', {
          email: loginEmail,
          password: loginPassword,
          redirect: false,
        });

        if (result?.error) {
          setLoginError(result.error);
          toast.error(result.error);
        } else {
          toast.success('Welcome back!');
          resetForm();
          setAuthDialog(false);
          await fetchProfile();
          setView('dashboard');
        }
      } catch {
        setLoginError('Something went wrong. Please try again.');
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoginLoading(false);
      }
    },
    [loginEmail, loginPassword, resetForm, setAuthDialog, fetchProfile, setView]
  );

  // ── Signup handler ───────────────────────────────────────
  const handleSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSignupError('');

      if (!signupName || !signupEmail || !signupPassword || !signupConfirm) {
        setSignupError('Please fill in all fields');
        return;
      }

      if (signupPassword.length < 6) {
        setSignupError('Password must be at least 6 characters');
        return;
      }

      if (signupPassword !== signupConfirm) {
        setSignupError('Passwords do not match');
        return;
      }

      setSignupLoading(true);
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: signupName,
            email: signupEmail,
            password: signupPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setSignupError(data.error || 'Registration failed');
          toast.error(data.error || 'Registration failed');
          return;
        }

        // Auto sign-in after successful registration
        const result = await signIn('credentials', {
          email: signupEmail,
          password: signupPassword,
          redirect: false,
        });

        if (result?.error) {
          // Registration succeeded but auto-login failed — prompt manual login
          toast.success('Account created! Please sign in.');
          setAuthDialog(true, 'login');
          resetForm();
        } else {
          toast.success('Account created! Welcome aboard!');
          resetForm();
          setAuthDialog(false);
          await fetchProfile();
          setView('dashboard');
        }
      } catch {
        setSignupError('Something went wrong. Please try again.');
        toast.error('Something went wrong. Please try again.');
      } finally {
        setSignupLoading(false);
      }
    },
    [signupName, signupEmail, signupPassword, signupConfirm, resetForm, setAuthDialog, fetchProfile, setView]
  );

  // If the user is already authenticated, don't show the dialog
  if (session) {
    return null;
  }

  return (
    <Dialog open={authDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Welcome to ResuMe AI
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={authMode}
          onValueChange={(v) => setAuthDialog(true, v as 'login' | 'signup')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* ── Sign In ─────────────────────────────────────── */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              {loginError && (
                <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {loginError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loginLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loginLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loginLoading}
              >
                {loginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </TabsContent>

          {/* ── Sign Up ─────────────────────────────────────── */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 pt-2">
              {signupError && (
                <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {signupError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  autoComplete="name"
                  disabled={signupLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  autoComplete="email"
                  disabled={signupLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={signupLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                  autoComplete="new-password"
                  disabled={signupLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={signupLoading}
              >
                {signupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
