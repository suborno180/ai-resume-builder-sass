'use client';

import { useAppStore } from '@/lib/store';
import Landing from '@/components/landing';
import Dashboard from '@/components/dashboard';
import AIChat from '@/components/ai-chat';
import SmartForm from '@/components/smart-form';
import AIPolish from '@/components/ai-polish';
import TemplateGallery from '@/components/template-gallery';
import ResumePreview from '@/components/resume-preview';
import AuthDialog from '@/components/auth-dialog';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Loader2, FileText } from 'lucide-react';

// ── Footer shared across views ──────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background/80 backdrop-blur-sm mt-auto">
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
  );
}

// ── Main Page Router ────────────────────────────────────────
export default function Home() {
  const { currentView, setView } = useAppStore();
  const { status } = useSession();

  // Auto-navigate when session changes
  useEffect(() => {
    if (status === 'authenticated' && currentView === 'landing') {
      setView('dashboard');
    }
    if (status === 'unauthenticated' && currentView !== 'landing') {
      setView('landing');
    }
  }, [status, currentView, setView]);

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

  // Route based on currentView
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-chat':
        return <AIChat />;
      case 'smart-form':
        return <SmartForm />;
      case 'ai-polish':
        return <AIPolish />;
      case 'templates':
        return <TemplateGallery />;
      case 'preview':
        return <ResumePreview />;
      case 'landing':
      default:
        return <Landing />;
    }
  };

  return (
    <>
      {renderView()}
      <AuthDialog />
    </>
  );
}
