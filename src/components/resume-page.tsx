'use client';

import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { renderResume } from '@/components/resume-templates';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Printer, FileText, LayoutDashboard } from 'lucide-react';
import type { ResumeRenderData } from '@/components/resume-templates';

export default function ResumePage() {
  const {
    profile,
    experiences,
    education,
    skills,
    selectedTemplate,
    setSelectedTemplate,
    setRoute,
  } = useAppStore();

  const resumeData: ResumeRenderData = {
    profile: profile || {},
    experiences,
    education,
    skills,
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.info('Use "Save as PDF" in the print dialog');
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col">
      {/* Print-specific CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .no-print {
            display: none !important;
          }
          .resume-print-area {
            width: 210mm !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .resume-print-area > div {
            break-inside: avoid;
          }
        }
        @media screen {
          .resume-print-area {
            break-inside: avoid;
          }
          .resume-print-area > div > div > div {
            break-inside: avoid;
          }
        }
      ` }} />

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-40 bg-neutral-800/90 backdrop-blur-md border-b border-neutral-700">
        <div className="flex h-12 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-neutral-300 hover:text-white hover:bg-neutral-700"
              onClick={() => setRoute('/templates')}
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to Templates</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="hidden sm:block h-4 w-px bg-neutral-700" />
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-neutral-300 hover:text-white hover:bg-neutral-700 hidden sm:flex"
              onClick={() => setRoute('/dashboard')}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Button>
          </div>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[140px] h-8 text-xs bg-neutral-700 border-neutral-600 text-neutral-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="elegant">Elegant</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="swiss">Swiss</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="infresh">Infresh</SelectItem>
              <SelectItem value="typograph">Typograph</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-neutral-600 text-neutral-200 hover:bg-neutral-700"
              onClick={handleDownload}
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-emerald-600 hover:bg-emerald-700"
              onClick={handlePrint}
            >
              <Printer className="size-3.5" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Document */}
      <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div
            className="resume-print-area bg-white shadow-2xl"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            {renderResume(selectedTemplate, resumeData)}
          </div>
        </motion.div>
        <p className="no-print text-xs text-neutral-500 mt-4">
          Press{' '}
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-300 font-mono">
            Ctrl+P
          </kbd>{' '}
          to print or save as PDF
        </p>
      </div>

      {/* Footer (no-print) */}
      <footer className="no-print border-t border-neutral-800 mt-auto">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <FileText className="size-3.5 text-emerald-500" />
            <span>
              Resu<span className="text-emerald-500">Me</span> AI
            </span>
            <span>&middot;</span>
            <span>AI-Powered Resume Builder</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
