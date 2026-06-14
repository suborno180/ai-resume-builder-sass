'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Plus,
  Send,
  Sparkles,
  MessageSquare,
  Loader2,
  Menu,
  Trash2,
  FileText,
  ArrowRight,
  LogOut,
  User,
} from 'lucide-react';

// ── Conversation type from API ───────────────────────────────
interface Conversation {
  id: string;
  title: string;
  targetJob: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  preview: string;
}

// ── Extended chat message with profile updates ───────────────
interface ChatMessageExt {
  role: 'user' | 'assistant';
  content: string;
  profileUpdates?: Record<string, unknown> | null;
}

// ── Example prompts for empty state ──────────────────────────
const EXAMPLE_PROMPTS = [
  {
    icon: '🎯',
    title: 'Target a specific role',
    description: 'I want to apply for a Data Scientist position at Google',
  },
  {
    icon: '🔄',
    title: 'Career transition',
    description: "I'm a web developer looking for a DevOps engineer role",
  },
  {
    icon: '📈',
    title: 'Level up your career',
    description: "I'm a marketing manager targeting a VP of Marketing position",
  },
  {
    icon: '🎓',
    title: 'Recent graduate',
    description: 'Recent grad seeking an entry-level software engineer job',
  },
];

// ── Relative time formatter ──────────────────────────────────
function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString();
}

// ── Simple Markdown Renderer ─────────────────────────────────
function renderMarkdown(text: string): string {
  let html = text;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-muted/50 rounded-md p-3 my-2 overflow-x-auto text-xs"><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code (` ... `)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted/50 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');

  // Bold (** ... **)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic (* ... *)
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // Unordered list items (- item or * item)
  // First group consecutive list items
  html = html.replace(/(?:^|\n)((?:[-*]\s+.+(?:\n|$))+)/g, (_match, listBlock: string) => {
    const items = listBlock.trim().split(/\n/).map((line: string) => {
      const itemText = line.replace(/^[-*]\s+/, '');
      return `<li class="ml-4 list-disc">${itemText}</li>`;
    }).join('');
    return `<ul class="my-1.5 space-y-0.5">${items}</ul>`;
  });

  // Line breaks (preserve newlines that aren't part of other formatting)
  html = html.replace(/\n/g, '<br/>');

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Main Component ───────────────────────────────────────────
export default function AIChat() {
  const {
    setView,
    currentConversationId,
    setCurrentConversationId,
    chatMessages,
    addChatMessage,
    setChatMessages,
    clearChat,
    aiLoading,
    setAiLoading,
    profile,
    setProfile,
    setExperiences,
    setEducation,
    setSkills,
  } = useAppStore();

  const { data: session } = useSession();

  // Local state
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [showProfileBadge, setShowProfileBadge] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Auto-scroll to bottom ────────────────────────────────
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, aiLoading, scrollToBottom]);

  // ── Auto-resize textarea ─────────────────────────────────
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = 160; // ~4 rows
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [input]);

  // ── Load conversations on mount ──────────────────────────
  useEffect(() => {
    loadConversations();
  }, []);

  // ── Load conversations ───────────────────────────────────
  const loadConversations = async () => {
    setLoadingConversations(true);
    try {
      const res = await fetch('/api/chat/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingConversations(false);
    }
  };

  // ── Select a conversation ────────────────────────────────
  const selectConversation = async (id: string) => {
    if (id === currentConversationId) return;
    setCurrentConversationId(id);
    clearChat();

    try {
      const res = await fetch(`/api/chat/messages?conversationId=${id}`);
      if (res.ok) {
        const data = await res.json();
        const msgs: ChatMessageExt[] = (data.messages || []).map(
          (m: { role: string; content: string; profileUpdates?: Record<string, unknown> | null }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
            profileUpdates: m.profileUpdates,
          })
        );
        setChatMessages(msgs);
      }
    } catch {
      toast.error('Failed to load messages');
    }

    setSidebarOpen(false);
  };

  // ── Create new chat ──────────────────────────────────────
  const createNewChat = async () => {
    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' }),
      });

      if (res.ok) {
        const data = await res.json();
        const conv = data.conversation;
        setCurrentConversationId(conv.id);
        clearChat();
        setConversations((prev) => [conv, ...prev]);
        inputRef.current?.focus();
      } else {
        toast.error('Failed to create conversation');
      }
    } catch {
      toast.error('Something went wrong');
    }

    setSidebarOpen(false);
  };

  // ── Delete conversation ──────────────────────────────────
  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);

    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (currentConversationId === id) {
          setCurrentConversationId(null);
          clearChat();
        }
        toast.success('Conversation deleted');
      } else {
        toast.error('Failed to delete conversation');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Handle profile updates from AI ───────────────────────
  const handleProfileUpdates = useCallback(
    (updates: Record<string, unknown>) => {
      const stringFields = [
        'firstName', 'lastName', 'jobTitle', 'email', 'phone',
        'location', 'website', 'linkedin', 'github', 'summary',
      ] as const;

      // Update profile fields
      const profileUpdates: Record<string, string> = {};
      for (const field of stringFields) {
        if (typeof updates[field] === 'string' && updates[field]) {
          profileUpdates[field] = updates[field] as string;
        }
      }

      if (Object.keys(profileUpdates).length > 0 && profile) {
        setProfile({ ...profile, ...profileUpdates });
      }

      // Update experiences
      if (Array.isArray(updates.experiences) && updates.experiences.length > 0) {
        setExperiences(
          updates.experiences.map((exp: unknown, i: number) => {
            const e = exp as Record<string, unknown>;
            return {
              company: (e.company as string) || '',
              position: (e.position as string) || '',
              startDate: (e.startDate as string) || '',
              endDate: (e.endDate as string) || undefined,
              current: (e.current as boolean) || false,
              description: (e.description as string) || undefined,
              location: (e.location as string) || undefined,
              order: i,
            };
          })
        );
      }

      // Update education
      if (Array.isArray(updates.education) && updates.education.length > 0) {
        setEducation(
          updates.education.map((edu: unknown, i: number) => {
            const e = edu as Record<string, unknown>;
            return {
              institution: (e.institution as string) || '',
              degree: (e.degree as string) || '',
              field: (e.field as string) || undefined,
              startDate: (e.startDate as string) || '',
              endDate: (e.endDate as string) || undefined,
              location: (e.location as string) || undefined,
              gpa: (e.gpa as string) || undefined,
              description: (e.description as string) || undefined,
              order: i,
            };
          })
        );
      }

      // Update skills
      if (Array.isArray(updates.skills) && updates.skills.length > 0) {
        setSkills(
          updates.skills.map((skill: unknown, i: number) => {
            const s = skill as Record<string, unknown>;
            return {
              name: (s.name as string) || '',
              category: (s.category as 'technical' | 'soft' | 'language' | 'other') || 'other',
              order: i,
            };
          })
        );
      }

      // Show badge and toast
      setShowProfileBadge(true);
      toast.success('Profile updated from conversation', { duration: 3000 });
      setTimeout(() => setShowProfileBadge(false), 4000);
    },
    [profile, setProfile, setExperiences, setEducation, setSkills]
  );

  // ── Send message ─────────────────────────────────────────
  const sendMessage = async () => {
    const message = input.trim();
    if (!message || aiLoading) return;

    // If no conversation, create one first
    let convId = currentConversationId;
    if (!convId) {
      try {
        const res = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'New Chat', targetJob: message.slice(0, 200) }),
        });
        if (res.ok) {
          const data = await res.json();
          convId = data.conversation.id;
          setCurrentConversationId(convId);
          setConversations((prev) => [data.conversation, ...prev]);
        } else {
          toast.error('Failed to create conversation');
          return;
        }
      } catch {
        toast.error('Something went wrong');
        return;
      }
    }

    setInput('');
    addChatMessage({ role: 'user', content: message });

    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversationId: convId }),
      });

      if (res.ok) {
        const data = await res.json();
        addChatMessage({
          role: 'assistant',
          content: data.content,
        });

        // Handle profile updates
        if (data.profileUpdates && Object.keys(data.profileUpdates).length > 0) {
          handleProfileUpdates(data.profileUpdates);
        }

        // Refresh conversation list (title might have changed)
        loadConversations();
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
      inputRef.current?.focus();
    }
  };

  // ── Handle key press ─────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Handle example prompt click ──────────────────────────
  const handleExampleClick = (description: string) => {
    setInput(description);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // ── Current conversation title ───────────────────────────
  const currentTitle =
    conversations.find((c) => c.id === currentConversationId)?.title ||
    'New Chat';

  // ── Check if enough messages for "Generate Resume" ───────
  const canGenerateResume = chatMessages.length >= 4;

  // ── User initials ────────────────────────────────────────
  const userInitials =
    profile?.firstName && profile?.lastName
      ? `${profile.firstName[0]}${profile.lastName[0]}`
      : session?.user?.email?.[0]?.toUpperCase() || 'U';

  const userName =
    profile?.firstName && profile?.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : session?.user?.email || 'User';

  // ── Sidebar content (shared between desktop & mobile) ────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={createNewChat}
          className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="size-4" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-0.5 py-1">
          {loadingConversations ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <MessageSquare className="size-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No conversations yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            conversations.map((conv) => (
              <motion.button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors group relative ${
                  conv.id === currentConversationId
                    ? 'bg-emerald-600/15 text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-start gap-2 pr-6">
                  <MessageSquare className="size-3.5 mt-0.5 shrink-0 opacity-60" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium leading-tight">
                      {conv.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                      {formatRelativeTime(conv.updatedAt)}
                    </p>
                  </div>
                </div>
                {/* Delete button */}
                <button
                  onClick={(e) => deleteConversation(conv.id, e)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive"
                >
                  {deletingId === conv.id ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Trash2 className="size-3" />
                  )}
                </button>
              </motion.button>
            ))
          )}
        </div>
      </ScrollArea>

      {/* User info at bottom */}
      <div className="border-t border-border/50 p-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-emerald-600/20 text-emerald-400 text-xs">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{userName}</p>
            <p className="text-[10px] text-muted-foreground">Free Plan</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={() => signOut()}
          >
            <LogOut className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden md:flex w-[260px] shrink-0 flex-col border-r border-border/50 bg-card/30">
        {/* Sidebar header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
          <div className="flex size-7 items-center justify-center rounded-md bg-emerald-600/15">
            <Sparkles className="size-3.5 text-emerald-500" />
          </div>
          <span className="text-sm font-semibold">
            Resu<span className="text-emerald-500">Me</span> AI
          </span>
        </div>
        <SidebarContent />
      </aside>

      {/* ── Main Chat Area ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden size-9"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Conversations</SheetTitle>
                </SheetHeader>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                  <div className="flex size-7 items-center justify-center rounded-md bg-emerald-600/15">
                    <Sparkles className="size-3.5 text-emerald-500" />
                  </div>
                  <span className="text-sm font-semibold">
                    Resu<span className="text-emerald-500">Me</span> AI
                  </span>
                </div>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Title */}
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-sm font-medium truncate">{currentTitle}</h1>
              {showProfileBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge className="gap-1 bg-emerald-600/15 text-emerald-400 border-emerald-600/20 text-[10px] px-2 py-0">
                    <Sparkles className="size-2.5" />
                    Profile updated
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>

          {/* Generate Resume button */}
          {canGenerateResume && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={() => setView('smart-form')}
                size="sm"
                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <FileText className="size-3.5" />
                <span className="hidden sm:inline">Generate Resume</span>
                <span className="sm:hidden">Generate</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </motion.div>
          )}
        </header>

        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--border)) transparent',
          }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            {/* Empty State */}
            {chatMessages.length === 0 && !aiLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
              >
                {/* Welcome icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="flex size-16 items-center justify-center rounded-2xl bg-emerald-600/10 mb-6"
                >
                  <Sparkles className="size-8 text-emerald-500" />
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">
                  Welcome to ResuMe AI
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mb-8">
                  Tell me about the job you&apos;re targeting and your background.
                  I&apos;ll help craft the perfect resume for you.
                </p>

                {/* Example prompts */}
                <div className="w-full max-w-lg space-y-2">
                  {EXAMPLE_PROMPTS.map((prompt, i) => (
                    <motion.button
                      key={prompt.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      onClick={() => handleExampleClick(prompt.description)}
                      className="w-full text-left rounded-xl border border-border/40 bg-card/50 hover:bg-card hover:border-emerald-600/30 px-4 py-3.5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{prompt.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">
                            {prompt.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {prompt.description}
                          </p>
                        </div>
                        <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-emerald-500 transition-colors shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Chat Messages */}
            <AnimatePresence mode="popLayout">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 mb-4 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  {msg.role === 'assistant' ? (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 mt-0.5">
                      <Sparkles className="size-4 text-emerald-500" />
                    </div>
                  ) : (
                    <Avatar className="size-8 shrink-0 mt-0.5">
                      <AvatarFallback className="bg-muted text-xs">
                        <User className="size-3.5" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-md'
                        : 'bg-card border border-border/30 rounded-tl-md'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div
                        className="prose-sm [&_strong]:font-semibold [&_em]:italic [&_code]:bg-muted/50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_pre]:bg-muted/50 [&_pre]:rounded-md [&_pre]:p-3 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_ul]:my-1.5 [&_ul]:space-y-0.5 [&_li]:ml-4 [&_li]:list-disc"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(msg.content),
                        }}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {aiLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 mb-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 mt-0.5">
                  <Sparkles className="size-4 text-emerald-500" />
                </div>
                <div className="bg-card border border-border/30 rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="size-2 rounded-full bg-emerald-500/60"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                    <motion.div
                      className="size-2 rounded-full bg-emerald-500/60"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.15,
                      }}
                    />
                    <motion.div
                      className="size-2 rounded-full bg-emerald-500/60"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Generate Resume CTA after enough messages */}
            {canGenerateResume && chatMessages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center pt-4 pb-2"
              >
                <Button
                  onClick={() => setView('smart-form')}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                  size="lg"
                >
                  <FileText className="size-4" />
                  Generate Resume
                  <ArrowRight className="size-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-md px-4 py-3 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={(el) => {
                    textareaRef.current = el;
                    (inputRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tell me about your target job and background..."
                  className="w-full min-h-[44px] max-h-[160px] resize-none rounded-xl border border-border/50 bg-card/80 px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-colors"
                  rows={1}
                  disabled={aiLoading}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || aiLoading}
                size="icon"
                className="shrink-0 size-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40"
              >
                {aiLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
              ResuMe AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
