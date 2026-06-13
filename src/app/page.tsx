'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { Loader2, FileText } from 'lucide-react';
import type { AppRoute } from '@/lib/types';
import Landing from '@/components/landing';
import Dashboard from '@/components/dashboard-page';
import ChatPage from '@/components/chat-page';
import ProfilePage from '@/components/profile-page';
import TemplatesPage from '@/components/templates-page';
import ResumePage from '@/components/resume-page';
import AuthDialog from '@/components/auth-dialog';

// ── Parse hash route ─────────────────────────────────────────
function getHashRoute(): AppRoute {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash.replace('#', '') || '/';
  const validRoutes: AppRoute[] = ['/', '/dashboard', '/chat', '/profile', '/templates', '/resume'];
  return validRoutes.includes(hash as AppRoute) ? (hash as AppRoute) : '/';
}

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background/80 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="size-4 text-primary" />
            <span>Resu<span className="text-primary">Me</span> AI</span>
            <span className="mx-1">&middot;</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>AI-Powered Resume Builder</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Page Router ─────────────────────────────────────────
export default function Home() {
  const { currentRoute, setRoute } = useAppStore();
  const { status } = useSession();
  const initializedRef = useRef(false);

  // Initialize route from hash on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initialRoute = getHashRoute();
    useAppStore.setState({ currentRoute: initialRoute });

    const handleHashChange = () => {
      const route = getHashRoute();
      useAppStore.setState({ currentRoute: route });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle auth-based redirects - but respect the current hash route
  useEffect(() => {
    if (status === 'authenticated') {
      // Only redirect from landing to dashboard if user is on landing
      const hashRoute = getHashRoute();
      if (hashRoute === '/' && currentRoute === '/') {
        setRoute('/dashboard');
      }
    }
    if (status === 'unauthenticated') {
      // Only redirect to landing if user is on a protected page
      const protectedRoutes: AppRoute[] = ['/dashboard', '/chat', '/profile', '/templates', '/resume'];
      if (protectedRoutes.includes(currentRoute)) {
        setRoute('/');
      }
    }
  }, [status, currentRoute, setRoute]);

  // Show loading while session is being checked
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentRoute) {
      case '/dashboard': return <Dashboard />;
      case '/chat': return <ChatPage />;
      case '/profile': return <ProfilePage />;
      case '/templates': return <TemplatesPage />;
      case '/resume': return <ResumePage />;
      case '/':
      default: return <Landing />;
    }
  };

  const showFooter = currentRoute !== '/chat';
  const isChatPage = currentRoute === '/chat';

  if (isChatPage) {
    return (
      <>
        <ChatPage />
        <AuthDialog />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {renderPage()}
      </div>
      {showFooter && <Footer />}
      <AuthDialog />
    </div>
  );
}
