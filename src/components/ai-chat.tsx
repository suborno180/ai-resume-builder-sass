'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Send,
  Sparkles,
  Loader2,
  FileText,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

const EXAMPLE_PROMPTS = [
  "I want to apply for a Data Scientist position at Google",
  "I'm a web developer looking for a DevOps engineer role",
  "I'm a marketing manager targeting a VP of Marketing position",
  "Recent grad seeking an entry-level software engineer job",
];

export default function AIChat() {
  const {
    setView,
    chatMessages,
    addChatMessage,
    clearChat,
    setJobAnalysis,
    setTargetJobDescription,
    setTargetJobTitle,
    aiLoading,
    setAiLoading,
    jobAnalysis,
    targetJobDescription,
  } = useAppStore();

  const [input, setInput] = useState('');
  const [analysisReady, setAnalysisReady] = useState(false);
  const [generating, setGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, aiLoading]);

  // Check if analysis is already done
  useEffect(() => {
    if (jobAnalysis && targetJobDescription) {
      setAnalysisReady(true);
    }
  }, [jobAnalysis, targetJobDescription]);

  // ── Send message to AI ──────────────────────────────────
  const handleSend = async () => {
    const message = input.trim();
    if (!message || aiLoading) return;

    setInput('');
    addChatMessage({ role: 'user', content: message });

    // Update target job description from first message or accumulate
    if (!targetJobDescription) {
      setTargetJobDescription(message);
    }

    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chat',
          context: {
            message,
            chatHistory: chatMessages,
            jobDescription: message,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiContent = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);
        addChatMessage({ role: 'assistant', content: aiContent });
      } else {
        addChatMessage({
          role: 'assistant',
          content: "I'm having trouble right now. Please try again.",
        });
        toast.error('AI response failed');
      }
    } catch {
      addChatMessage({
        role: 'assistant',
        content: "I'm having trouble right now. Please try again.",
      });
      toast.error('Something went wrong');
    } finally {
      setAiLoading(false);
    }
  };

  // ── Handle example prompt click ─────────────────────────
  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    // Auto-focus the input
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // ── Generate resume structure ───────────────────────────
  const handleGenerateStructure = async () => {
    setGenerating(true);
    setAiLoading(true);

    try {
      // Combine all user messages for context
      const fullDescription = targetJobDescription || chatMessages
        .filter((m) => m.role === 'user')
        .map((m) => m.content)
        .join('. ');

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'analyze-job',
          context: {
            jobDescription: fullDescription,
            chatHistory: chatMessages,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const analysis = data.content;

        if (analysis && analysis.jobTitle) {
          setJobAnalysis(analysis);
          setTargetJobTitle(analysis.jobTitle);
          setTargetJobDescription(fullDescription);
          setAnalysisReady(true);
          addChatMessage({
            role: 'assistant',
            content: `I've analyzed the job and created a resume structure for a **${analysis.jobTitle}** role. I've identified the key sections and skills you'll need. Click "Continue to Form" to start filling in your details!`,
          });
          toast.success('Resume structure generated!');
        } else {
          toast.error('AI returned unexpected format. Please try again.');
        }
      } else {
        toast.error('Failed to generate resume structure');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setGenerating(false);
      setAiLoading(false);
    }
  };

  // ── Handle key press ────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => setView('dashboard')}
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <h1 className="text-base font-semibold tracking-tight">
              AI Resume Chat
            </h1>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
          style={{ maxHeight: 'calc(100vh - 220px)' }}
        >
          {/* Welcome message */}
          {chatMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="size-4 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <Card className="border-border/30 bg-card/80">
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">
                        👋 Hi! I&apos;m your AI resume assistant. Tell me about the job
                        you&apos;re targeting, and I&apos;ll help craft the perfect resume
                        for you. What position are you aiming for?
                      </p>
                    </CardContent>
                  </Card>

                  {/* Example prompts */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Try these examples
                    </p>
                    <div className="space-y-2">
                      {EXAMPLE_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleExampleClick(prompt)}
                          className="w-full text-left rounded-lg border border-border/40 bg-card/50 px-4 py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <ChevronRight className="size-4 text-primary shrink-0" />
                            {prompt}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Chat messages */}
          <AnimatePresence>
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                ) : (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <MessageSquare className="size-4 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border/30'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {aiLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="size-4 text-primary" />
              </div>
              <div className="rounded-xl bg-card border border-border/30 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="size-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="size-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Generate / Continue buttons */}
          {chatMessages.length >= 2 && !analysisReady && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pt-2"
            >
              <Button
                onClick={handleGenerateStructure}
                disabled={generating || aiLoading}
                className="gap-2 px-6"
              >
                {generating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <FileText className="size-4" />
                )}
                {generating ? 'Generating...' : 'Generate Resume Structure'}
              </Button>
            </motion.div>
          )}

          {analysisReady && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 pt-2"
            >
              <Badge className="gap-1.5 bg-primary/15 text-primary border-primary/20 px-4 py-1.5">
                <Sparkles className="size-3.5" />
                Resume structure ready!
              </Badge>
              <Button
                onClick={() => setView('smart-form')}
                className="gap-2 px-6"
              >
                Continue to Form
                <ChevronRight className="size-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-md px-4 py-4">
          <div className="flex items-end gap-3 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the job you want..."
                className="min-h-[44px] max-h-[120px] resize-none bg-secondary/50 border-border/50 pr-12"
                rows={1}
                disabled={aiLoading}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || aiLoading}
              size="icon"
              className="shrink-0 size-11"
            >
              {aiLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </div>
        </div>
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
