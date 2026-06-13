'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, FileText, Sparkles, ChevronRight, Loader2 } from 'lucide-react';

// ── Template definitions ──────────────────────────────────────
const TEMPLATES = [
  { id: 'minimal', name: 'Minimal', description: 'Clean single-column layout with simple lines' },
  { id: 'modern', name: 'Modern', description: 'Two-column layout with dark sidebar for skills/contact' },
  { id: 'professional', name: 'Professional', description: 'Traditional format with centered header and horizontal rules' },
  { id: 'creative', name: 'Creative', description: 'Colored accent sidebar with modern typography' },
  { id: 'executive', name: 'Executive', description: 'Bold header with strong typography' },
  { id: 'compact', name: 'Compact', description: 'Dense two-column layout for maximum content' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── CSS-based Template Preview Components ─────────────────────
function MinimalPreview() {
  return (
    <div className="bg-white text-gray-800 p-4 text-[6px] leading-[1.4] h-40 overflow-hidden font-sans">
      <div className="text-center mb-2">
        <div className="text-[10px] font-bold text-gray-900">John Doe</div>
        <div className="text-gray-500 text-[5px]">john@email.com · (555) 123-4567 · San Francisco, CA</div>
      </div>
      <div className="border-t border-gray-200 pt-1 mb-1">
        <div className="font-bold text-[7px] text-gray-700 uppercase tracking-wider mb-0.5">Professional Summary</div>
        <div className="text-gray-600">Experienced software engineer with 5+ years of expertise in building scalable applications...</div>
      </div>
      <div className="border-t border-gray-200 pt-1 mb-1">
        <div className="font-bold text-[7px] text-gray-700 uppercase tracking-wider mb-0.5">Experience</div>
        <div className="flex justify-between"><span className="font-semibold">Senior Developer</span><span className="text-gray-400">2021–Present</span></div>
        <div className="text-gray-400 text-[5px]">Company Name</div>
        <div className="text-gray-600">• Led team of 5 developers • Implemented CI/CD pipeline</div>
      </div>
      <div className="border-t border-gray-200 pt-1">
        <div className="font-bold text-[7px] text-gray-700 uppercase tracking-wider mb-0.5">Education</div>
        <div className="text-gray-600">B.S. Computer Science — Stanford University</div>
      </div>
    </div>
  );
}

function ModernPreview() {
  return (
    <div className="bg-white text-gray-800 h-40 overflow-hidden font-sans flex">
      <div className="bg-gray-800 text-white p-3 w-[35%] text-[5px]">
        <div className="text-[9px] font-bold mb-2">John Doe</div>
        <div className="text-gray-300 mb-2">
          <div className="font-semibold text-[6px] text-emerald-400 mb-0.5">Contact</div>
          <div>john@email.com</div>
          <div>(555) 123-4567</div>
          <div>San Francisco, CA</div>
        </div>
        <div className="mb-2">
          <div className="font-semibold text-[6px] text-emerald-400 mb-0.5">Skills</div>
          <div className="flex flex-wrap gap-0.5">
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((s) => (
              <span key={s} className="bg-gray-700 rounded px-1 py-px text-[4px]">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold text-[6px] text-emerald-400 mb-0.5">Education</div>
          <div>B.S. Computer Science</div>
          <div className="text-gray-400">Stanford University</div>
        </div>
      </div>
      <div className="p-3 flex-1 text-[5px]">
        <div className="mb-2">
          <div className="font-bold text-[6px] text-gray-700 uppercase tracking-wider mb-0.5">Summary</div>
          <div className="text-gray-600">Experienced software engineer with 5+ years of expertise...</div>
        </div>
        <div>
          <div className="font-bold text-[6px] text-gray-700 uppercase tracking-wider mb-0.5">Experience</div>
          <div className="font-semibold">Senior Developer — Company</div>
          <div className="text-gray-400">2021–Present</div>
          <div className="text-gray-600">• Led team of 5 developers • Built scalable APIs</div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="bg-white text-gray-800 p-4 text-[6px] leading-[1.4] h-40 overflow-hidden font-sans">
      <div className="text-center mb-2">
        <div className="text-[11px] font-bold text-gray-900 tracking-wide">JOHN DOE</div>
        <div className="text-gray-500 text-[5px] my-0.5">Software Engineer</div>
        <div className="border-t-2 border-gray-800 my-1" />
        <div className="text-gray-500 text-[5px]">john@email.com · (555) 123-4567 · San Francisco, CA · linkedin.com/in/johndoe</div>
      </div>
      <div className="mb-1">
        <div className="text-center font-bold text-[7px] text-gray-700 uppercase tracking-wider mb-0.5 border-b border-gray-300 pb-0.5">Professional Summary</div>
        <div className="text-gray-600 text-center">Experienced software engineer with 5+ years of expertise in building scalable applications.</div>
      </div>
      <div>
        <div className="text-center font-bold text-[7px] text-gray-700 uppercase tracking-wider mb-0.5 border-b border-gray-300 pb-0.5">Professional Experience</div>
        <div className="text-center"><span className="font-semibold">Senior Developer</span> · Company Name · 2021–Present</div>
        <div className="text-gray-600 text-center">• Led team of 5 developers • Improved performance by 40%</div>
      </div>
    </div>
  );
}

function CreativePreview() {
  return (
    <div className="bg-white text-gray-800 h-40 overflow-hidden font-sans flex">
      <div className="bg-emerald-600 text-white p-3 w-[30%] text-[5px]">
        <div className="text-[9px] font-bold mb-3">John Doe</div>
        <div className="space-y-2">
          <div>
            <div className="font-semibold text-[6px] text-emerald-200 mb-0.5">Contact</div>
            <div>john@email.com</div>
            <div>(555) 123-4567</div>
          </div>
          <div>
            <div className="font-semibold text-[6px] text-emerald-200 mb-0.5">Skills</div>
            {['React', 'TypeScript', 'Node.js', 'Python'].map((s) => (
              <div key={s} className="mb-0.5">
                <div className="bg-emerald-500/50 rounded-full h-1"><div className="bg-white rounded-full h-1" style={{ width: `${60 + Math.random() * 40}%` }} /></div>
                <span className="text-[4px]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 flex-1 text-[5px]">
        <div className="mb-2">
          <div className="font-bold text-[6px] text-emerald-600 uppercase tracking-wider mb-0.5">Summary</div>
          <div className="text-gray-600">Creative software engineer with a passion for building innovative solutions...</div>
        </div>
        <div>
          <div className="font-bold text-[6px] text-emerald-600 uppercase tracking-wider mb-0.5">Experience</div>
          <div className="font-semibold">Senior Developer — Company</div>
          <div className="text-gray-400">2021–Present</div>
          <div className="text-gray-600">• Led cross-functional team • Delivered 3 major features</div>
        </div>
      </div>
    </div>
  );
}

function ExecutivePreview() {
  return (
    <div className="bg-white text-gray-800 text-[6px] leading-[1.4] h-40 overflow-hidden font-sans">
      <div className="bg-gray-900 text-white p-3 text-center -mx-4 -mt-4 mb-2">
        <div className="text-[12px] font-bold tracking-widest">JOHN DOE</div>
        <div className="text-emerald-400 text-[6px] font-medium tracking-wide">VICE PRESIDENT OF ENGINEERING</div>
        <div className="text-gray-400 text-[5px] mt-0.5">john@email.com · (555) 123-4567 · San Francisco, CA</div>
      </div>
      <div className="px-4">
        <div className="mb-1.5">
          <div className="font-bold text-[7px] text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-0.5 mb-0.5">Executive Summary</div>
          <div className="text-gray-600">Seasoned technology executive with 15+ years of leadership experience.</div>
        </div>
        <div>
          <div className="font-bold text-[7px] text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-0.5 mb-0.5">Professional Experience</div>
          <div className="font-semibold text-[7px]">VP of Engineering — Tech Corp</div>
          <div className="text-gray-400">2019–Present</div>
          <div className="text-gray-600">• Managed 50+ engineers across 8 teams • Grew revenue 200%</div>
        </div>
      </div>
    </div>
  );
}

function CompactPreview() {
  return (
    <div className="bg-white text-gray-800 p-3 text-[5px] leading-[1.3] h-40 overflow-hidden font-sans">
      <div className="flex justify-between items-start mb-1 border-b border-gray-200 pb-1">
        <div>
          <div className="text-[9px] font-bold text-gray-900">John Doe</div>
          <div className="text-gray-500 text-[4px]">Software Engineer · San Francisco, CA</div>
        </div>
        <div className="text-right text-gray-500 text-[4px]">
          <div>john@email.com</div>
          <div>(555) 123-4567</div>
          <div>linkedin.com/in/johndoe</div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="font-bold text-[6px] text-gray-700 uppercase mb-0.5">Summary</div>
          <div className="text-gray-600 mb-1">Experienced engineer with expertise in full-stack development and cloud architecture.</div>
          <div className="font-bold text-[6px] text-gray-700 uppercase mb-0.5">Experience</div>
          <div className="mb-0.5"><span className="font-semibold">Sr. Developer</span> — Company · 2021–Present</div>
          <div className="text-gray-500">• Led team of 5 • Built APIs serving 1M+ users</div>
        </div>
        <div className="w-[30%]">
          <div className="font-bold text-[6px] text-gray-700 uppercase mb-0.5">Skills</div>
          <div className="flex flex-wrap gap-0.5 mb-1">
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((s) => (
              <span key={s} className="bg-gray-100 rounded px-1 py-px text-[4px]">{s}</span>
            ))}
          </div>
          <div className="font-bold text-[6px] text-gray-700 uppercase mb-0.5">Education</div>
          <div className="text-gray-600">B.S. CS — Stanford</div>
        </div>
      </div>
    </div>
  );
}

const PREVIEW_MAP: Record<string, React.ComponentType> = {
  minimal: MinimalPreview,
  modern: ModernPreview,
  professional: ProfessionalPreview,
  creative: CreativePreview,
  executive: ExecutivePreview,
  compact: CompactPreview,
};

export default function TemplatesPage() {
  const { selectedTemplate, setSelectedTemplate, setRoute, profile, experiences, education, skills, setCurrentResume } = useAppStore();
  const [creating, setCreating] = useState(false);

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = async () => {
    setCreating(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `My ${TEMPLATES.find((t) => t.id === selectedTemplate)?.name || ''} Resume`,
          templateId: selectedTemplate,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentResume(data.resume);
        toast.success('Resume created!');
        setRoute('/resume');
      } else {
        toast.error('Failed to create resume');
        setRoute('/resume');
      }
    } catch {
      toast.error('Something went wrong');
      setRoute('/resume');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setRoute('/dashboard')}>
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                <FileText className="size-4 text-primary" />
              </div>
              <h1 className="text-base font-semibold tracking-tight">Choose Template</h1>
            </div>
          </div>
          <Button onClick={handleContinue} disabled={creating} className="gap-2">
            {creating ? <Loader2 className="size-4 animate-spin" /> : null}
            {creating ? 'Creating...' : 'Preview Resume'}
            {!creating && <ChevronRight className="size-4" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="text-sm text-muted-foreground mb-6">
          Select a template for your resume. Click to select, then preview.
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEMPLATES.map((t) => {
            const isSelected = selectedTemplate === t.id;
            const PreviewComponent = PREVIEW_MAP[t.id];

            return (
              <motion.div
                key={t.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary shadow-md shadow-primary/10 ring-1 ring-primary/20'
                      : 'border-border/50 hover:border-primary/40'
                  }`}
                  onClick={() => handleSelect(t.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{t.name}</CardTitle>
                      {isSelected && (
                        <Badge className="gap-1 text-[10px] px-2 py-0.5">
                          <Check className="size-3" />
                          Selected
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-md overflow-hidden border border-gray-200 shadow-sm">
                      {PreviewComponent && <PreviewComponent />}
                    </div>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                    <Button
                      size="sm"
                      className={`w-full gap-1.5 ${
                        isSelected ? '' : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                      variant={isSelected ? 'default' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(t.id);
                      }}
                    >
                      {isSelected ? (
                        <><Check className="size-3.5" /> Selected</>
                      ) : (
                        'Use Template'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
