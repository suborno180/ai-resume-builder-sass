'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import {
  Plus, Send, Sparkles, MessageSquare, Loader2, Menu, Trash2,
  FileText, LogOut, User, LayoutDashboard, Check, X, Pencil,
  ChevronDown, ChevronUp, FileDown, Shield, CheckCircle2, AlertCircle,
  Paperclip,
} from 'lucide-react';
import type { ExtractedField, ChatMessage } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

interface Conversation {
  id: string; title: string; targetJob: string;
  createdAt: string; updatedAt: string; messageCount: number; preview: string;
}

const EXAMPLE_PROMPTS = [
  { icon: '🎯', title: 'Target a specific role', description: 'I want to apply for a Client Relationship Executive position' },
  { icon: '🔄', title: 'Career transition', description: "I'm a web developer looking to transition into DevOps" },
  { icon: '📝', title: 'Update my info', description: 'My name is Rahim, I work at Brain Station as a developer' },
  { icon: '💼', title: 'Build from scratch', description: "Help me create a resume for a marketing manager position" },
];

// ── Extracted Info Card ──────────────────────────────────────
function ExtractedInfoCard({
  fields,
  onConfirm,
  onReject,
  onEdit,
  onConfirmAll,
  onRejectAll,
}: {
  fields: ExtractedField[];
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (id: string, newValue: string) => void;
  onConfirmAll: () => void;
  onRejectAll: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [expanded, setExpanded] = useState(true);

  const pendingCount = fields.filter(f => f.status === 'pending').length;
  const confirmedCount = fields.filter(f => f.status === 'confirmed' || f.status === 'edited').length;

  const handleEdit = (id: string) => {
    if (editingId === id) {
      onEdit(id, editValue);
      setEditingId(null);
      setEditValue('');
    } else {
      const field = fields.find(f => f.id === id);
      const val = field?.status === 'edited' && field?.editedValue ? field.editedValue : field?.value;
      setEditingId(id);
      setEditValue(typeof val === 'string' ? val : JSON.stringify(val, null, 2));
    }
  };

  const renderValue = (field: ExtractedField) => {
    const val = field.status === 'edited' && field.editedValue ? field.editedValue : field.value;
    if (typeof val === 'string') return <span>{val}</span>;
    if (Array.isArray(val)) {
      return (
        <div className="space-y-1.5">
          {val.map((item, i) => {
            if (typeof item === 'object' && item !== null) {
              return (
                <div key={i} className="text-xs bg-background/60 rounded-md p-2.5 border border-border/20">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className="flex gap-2 py-0.5">
                      <span className="text-muted-foreground capitalize min-w-[80px] text-[11px]">{k}:</span>
                      <span className="text-[11px]">{String(v)}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return <div key={i}>{String(item)}</div>;
          })}
        </div>
      );
    }
    if (typeof val === 'object' && val !== null) {
      return (
        <div className="text-xs bg-background/60 rounded-md p-2.5 border border-border/20">
          {Object.entries(val).map(([k, v]) => (
            <div key={k} className="flex gap-2 py-0.5">
              <span className="text-muted-foreground capitalize min-w-[80px] text-[11px]">{k}:</span>
              <span className="text-[11px]">{String(v)}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span>{String(val)}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="my-3 rounded-xl border border-primary/20 bg-primary/5 overflow-hidden"
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-primary/10 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-primary" />
          <span className="text-sm font-medium">Review Changes</span>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {pendingCount} pending · {confirmedCount} confirmed
          </Badge>
        </div>
        {expanded ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-4 pb-3 space-y-2 max-h-[400px] overflow-y-auto">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`flex items-start gap-2 p-2.5 rounded-lg border transition-all ${
                    field.status === 'confirmed' || field.status === 'edited'
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : field.status === 'rejected'
                      ? 'border-destructive/30 bg-destructive/5 opacity-50'
                      : 'border-border/30 bg-background/40'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                      {field.label}
                    </div>
                    {editingId === field.id ? (
                      <div className="flex gap-1.5 mt-1">
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="text-xs min-h-[60px] resize-none"
                          autoFocus
                        />
                        <div className="flex flex-col gap-1">
                          <Button size="icon" variant="ghost" className="size-7 text-emerald-500" onClick={() => handleEdit(field.id)}>
                            <Check className="size-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="size-7 text-destructive" onClick={() => { setEditingId(null); setEditValue(''); }}>
                            <X className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm">{renderValue(field)}</div>
                    )}
                  </div>
                  {editingId !== field.id && field.status !== 'rejected' && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      {field.status === 'pending' && (
                        <>
                          <Button size="icon" variant="ghost" className="size-7 text-emerald-500 hover:bg-emerald-500/10" onClick={() => onConfirm(field.id)} title="Confirm">
                            <Check className="size-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="size-7 text-destructive hover:bg-destructive/10" onClick={() => onReject(field.id)} title="Reject">
                            <X className="size-3.5" />
                          </Button>
                        </>
                      )}
                      <Button size="icon" variant="ghost" className="size-7 text-muted-foreground hover:text-foreground" onClick={() => handleEdit(field.id)} title="Edit">
                        <Pencil className="size-3.5" />
                      </Button>
                      {(field.status === 'confirmed' || field.status === 'edited') && (
                        <Badge className="text-[9px] px-1 py-0 bg-emerald-500/15 text-emerald-500 border-emerald-500/20">
                          <CheckCircle2 className="size-2.5 mr-0.5" />OK
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pendingCount > 0 && (
              <div className="px-4 pb-3 flex items-center gap-2">
                <Button size="sm" className="gap-1.5 text-xs" onClick={onConfirmAll}>
                  <Check className="size-3" /> Confirm All ({pendingCount})
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs text-destructive hover:text-destructive" onClick={onRejectAll}>
                  <X className="size-3" /> Reject All
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Profile Status Bar ───────────────────────────────────────
function ProfileStatusBar({ profile, experiences, education, skills }: {
  profile: ReturnType<typeof useAppStore>['profile'];
  experiences: ReturnType<typeof useAppStore>['experiences'];
  education: ReturnType<typeof useAppStore>['education'];
  skills: ReturnType<typeof useAppStore>['skills'];
}) {
  const completion = useMemo(() => {
    if (!profile) return 0;
    const fields = [
      profile.firstName, profile.lastName, profile.jobTitle,
      profile.email, profile.phone, profile.location, profile.summary, profile.hobbies,
    ];
    const filled = fields.filter(Boolean).length;
    const bonus = (experiences.length > 0 ? 1 : 0) + (education.length > 0 ? 1 : 0) + (skills.length > 0 ? 1 : 0);
    return Math.min(100, Math.round(((filled + bonus) / 11) * 100));
  }, [profile, experiences, education, skills]);

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-muted/30 rounded-lg border border-border/20">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-medium text-muted-foreground">Profile Completion</span>
          <span className="text-[10px] font-bold text-primary">{completion}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${completion}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground shrink-0">
        {experiences.length > 0 && <Badge variant="secondary" className="text-[8px] px-1 py-0">{experiences.length} exp</Badge>}
        {education.length > 0 && <Badge variant="secondary" className="text-[8px] px-1 py-0">{education.length} edu</Badge>}
        {skills.length > 0 && <Badge variant="secondary" className="text-[8px] px-1 py-0">{skills.length} skills</Badge>}
      </div>
    </div>
  );
}

// ── Conversation Item (reusable for sidebar & sheet) ──────────
function ConversationItem({
  conv,
  isActive,
  onSelect,
  onDelete,
  deleteConfirmId,
  setDeleteConfirmId,
}: {
  conv: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  deleteConfirmId: string | null;
  setDeleteConfirmId: (id: string | null) => void;
}) {
  const isConfirming = deleteConfirmId === conv.id;

  return (
    <div
      className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-colors text-sm ${
        isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
      }`}
      onClick={onSelect}
    >
      <MessageSquare className="size-3.5 shrink-0" />
      <span className="truncate min-w-0 flex-1">{conv.title}</span>
      <div className="shrink-0 flex items-center" onClick={(e) => e.stopPropagation()}>
        {isConfirming ? (
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="size-6 text-destructive hover:bg-destructive/10"
              onClick={onDelete}>
              <Check className="size-3" />
            </Button>
            <Button variant="ghost" size="icon" className="size-6 text-muted-foreground"
              onClick={() => setDeleteConfirmId(null)}>
              <X className="size-3" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="size-6 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            onClick={() => setDeleteConfirmId(conv.id)}>
            <Trash2 className="size-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Main Chat Page ───────────────────────────────────────────
export default function ChatPage() {
  const {
    currentConversationId, setCurrentConversationId,
    chatMessages, addChatMessage, setChatMessages, clearChat,
    conversations, setConversations,
    pendingFields, setPendingFields, updateFieldStatus, clearPendingFields,
    aiLoading, setAiLoading,
    setRoute, setProfile, setExperiences, setEducation, setSkills,
    profile, experiences, education, skills,
  } = useAppStore();

  const { data: session } = useSession();
  const [inputMessage, setInputMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // base64 data URL
  const [selectedImageName, setSelectedImageName] = useState<string>('');

  // ── Fetch conversations ──────────────────────────────────────
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations);
      }
    } catch { /* silent */ }
  }, [setConversations]);

  // ── Fetch messages ───────────────────────────────────────────
  const fetchMessages = useCallback(async (convId: string) => {
    try {
      const res = await fetch(`/api/chat/messages?conversationId=${convId}`);
      if (res.ok) {
        const data = await res.json();
        setChatMessages(
          data.messages.map((m: { id: string; role: string; content: string; imageUrl: string; profileUpdates: string; createdAt: string }) => ({
            id: m.id,
            role: m.role as 'user' | 'assistant',
            content: m.content,
            imageUrl: m.imageUrl || undefined,
            extractedInfo: m.profileUpdates ? (typeof m.profileUpdates === 'string' ? JSON.parse(m.profileUpdates) : m.profileUpdates) : undefined,
            createdAt: m.createdAt,
          }))
        );
      }
    } catch { /* silent */ }
  }, [setChatMessages]);

  // ── Fetch profile ────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        const p = data.profile;
        setProfile({
          id: p.id, firstName: p.firstName ?? '', lastName: p.lastName ?? '',
          jobTitle: p.jobTitle ?? '', email: p.email ?? '', phone: p.phone ?? '',
          location: p.location ?? '', website: p.website ?? '', linkedin: p.linkedin ?? '',
          github: p.github ?? '', summary: p.summary ?? '', hobbies: p.hobbies ?? '',
        });
        setExperiences((p.experiences ?? []).map((e: Record<string, unknown>) => ({
          id: e.id as string, company: (e.company as string) ?? '', position: (e.position as string) ?? '',
          location: (e.location as string) ?? '', startDate: (e.startDate as string) ?? '',
          endDate: (e.endDate as string) ?? '', current: (e.current as boolean) ?? false,
          description: (e.description as string) ?? '', order: (e.order as number) ?? 0,
        })));
        setEducation((p.education ?? []).map((e: Record<string, unknown>) => ({
          id: e.id as string, institution: (e.institution as string) ?? '', degree: (e.degree as string) ?? '',
          field: (e.field as string) ?? '', location: (e.location as string) ?? '',
          startDate: (e.startDate as string) ?? '', endDate: (e.endDate as string) ?? '',
          gpa: (e.gpa as string) ?? '', description: (e.description as string) ?? '', order: (e.order as number) ?? 0,
        })));
        setSkills((p.skills ?? []).map((s: Record<string, unknown>) => ({
          id: s.id as string, name: (s.name as string) ?? '',
          category: (s.category as 'technical' | 'soft' | 'language' | 'other') ?? 'technical',
          order: (s.order as number) ?? 0,
        })));
      }
    } catch { /* silent */ }
  }, [setProfile, setExperiences, setEducation, setSkills]);

  useEffect(() => { fetchConversations(); fetchProfile(); }, [fetchConversations, fetchProfile]);

  // ── Auto-scroll ──────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, pendingFields]);

  // ── Create conversation ──────────────────────────────────────
  const createConversation = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentConversationId(data.conversation.id);
        clearChat();
        clearPendingFields();
        await fetchConversations();
        return data.conversation.id;
      }
    } catch { toast.error('Failed to create conversation'); }
    return null;
  }, [setCurrentConversationId, clearChat, clearPendingFields, fetchConversations]);

  // ── Delete conversation ──────────────────────────────────────
  const deleteConversation = useCallback(async (convId: string) => {
    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: convId }),
      });
      if (res.ok) {
        if (currentConversationId === convId) {
          setCurrentConversationId(null);
          clearChat();
          clearPendingFields();
        }
        await fetchConversations();
        toast.success('Conversation deleted');
      }
    } catch { toast.error('Failed to delete'); }
    setDeleteConfirm(null);
  }, [currentConversationId, setCurrentConversationId, clearChat, clearPendingFields, fetchConversations]);

  // ── Select conversation ──────────────────────────────────────
  const selectConversation = useCallback(async (convId: string) => {
    setCurrentConversationId(convId);
    clearPendingFields();
    await fetchMessages(convId);
    setSidebarOpen(false);
  }, [setCurrentConversationId, clearPendingFields, fetchMessages]);

  // ── Handle image selection ─────────────────────────────────
  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      setSelectedImageName(file.name);
    };
    reader.readAsDataURL(file);

    // Reset file input so the same file can be re-selected
    e.target.value = '';
  }, []);

  const removeSelectedImage = useCallback(() => {
    setSelectedImage(null);
    setSelectedImageName('');
  }, []);

  // ── Send message ─────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const trimmed = inputMessage.trim();
    if ((!trimmed && !selectedImage) || aiLoading) return;

    let convId = currentConversationId;
    if (!convId) {
      convId = await createConversation();
      if (!convId) return;
    }

    addChatMessage({
      role: 'user',
      content: trimmed || '[Image]',
      imageUrl: selectedImage || undefined,
    });
    setInputMessage('');
    const imageToSend = selectedImage;
    setSelectedImage(null);
    setSelectedImageName('');
    setAiLoading(true);
    if (inputRef.current) inputRef.current.style.height = 'auto';

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed || '[Image]',
          conversationId: convId,
          imageUrl: imageToSend || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        addChatMessage({
          role: 'assistant',
          content: data.content,
          extractedInfo: data.extractedFields || undefined,
        });

        if (data.extractedFields && data.extractedFields.length > 0) {
          setPendingFields([...pendingFields, ...data.extractedFields]);
        }

        if (data.generateResume?.ready) {
          toast.success('Ready to generate your resume!', {
            action: { label: 'Choose Template', onClick: () => setRoute('/templates') },
          });
        }

        await fetchConversations();
      } else {
        toast.error('Failed to get response');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setAiLoading(false);
    }
  }, [inputMessage, selectedImage, aiLoading, currentConversationId, createConversation, addChatMessage, setAiLoading, pendingFields, setPendingFields, fetchConversations, setRoute]);

  // ── Confirmation handlers ────────────────────────────────────
  const handleConfirmField = useCallback((fieldId: string) => { updateFieldStatus(fieldId, 'confirmed'); }, [updateFieldStatus]);
  const handleRejectField = useCallback((fieldId: string) => { updateFieldStatus(fieldId, 'rejected'); }, [updateFieldStatus]);
  const handleEditField = useCallback((fieldId: string, newValue: string) => { updateFieldStatus(fieldId, 'edited', newValue); }, [updateFieldStatus]);
  const handleConfirmAll = useCallback(() => { pendingFields.forEach(f => { if (f.status === 'pending') updateFieldStatus(f.id, 'confirmed'); }); }, [pendingFields, updateFieldStatus]);
  const handleRejectAll = useCallback(() => { pendingFields.forEach(f => { if (f.status === 'pending') updateFieldStatus(f.id, 'rejected'); }); }, [pendingFields, updateFieldStatus]);

  // ── Save confirmed fields ────────────────────────────────────
  const saveConfirmedFields = useCallback(async () => {
    const confirmed = pendingFields.filter(f => f.status === 'confirmed' || f.status === 'edited');
    if (confirmed.length === 0) { toast.error('No confirmed fields to save'); return; }

    try {
      const res = await fetch('/api/profile/confirm', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: confirmed }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(`✅ Saved ${confirmed.length} fields to your profile!`, {
          action: { label: 'View Profile', onClick: () => setRoute('/profile') },
        });
        clearPendingFields();
        await fetchProfile();
      } else {
        toast.error('Failed to save');
      }
    } catch {
      toast.error('Network error');
    }
  }, [pendingFields, clearPendingFields, fetchProfile, setRoute]);

  const handleExampleClick = useCallback((description: string) => {
    setInputMessage(description);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }, [sendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  }, []);

  const confirmedCount = pendingFields.filter(f => f.status === 'confirmed' || f.status === 'edited').length;
  const hasPendingOrConfirmed = pendingFields.length > 0;

  // ── Render message image ──────────────────────────────────
  const renderMessageImage = (imageUrl: string) => (
    <div className="mt-2 mb-1">
      <img
        src={imageUrl}
        alt="Uploaded image"
        className="max-w-[280px] max-h-[300px] rounded-lg border border-border/30 object-contain cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => window.open(imageUrl, '_blank')}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 flex bg-background">
      {/* ── Sidebar (desktop) ────────────────────────────────── */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/30 bg-card/30 shrink-0">
        <div className="flex items-center justify-between p-3 border-b border-border/30">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs w-full justify-start" onClick={createConversation}>
            <Plus className="size-4" /> New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-2 space-y-1 overflow-hidden">
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                isActive={currentConversationId === conv.id}
                onSelect={() => selectConversation(conv.id)}
                onDelete={() => deleteConversation(conv.id)}
                deleteConfirmId={deleteConfirm}
                setDeleteConfirmId={setDeleteConfirm}
              />
            ))}
            {conversations.length === 0 && (
              <div className="text-xs text-muted-foreground text-center py-8">No conversations yet</div>
            )}
          </div>
        </ScrollArea>

        {/* Profile status in sidebar */}
        <div className="p-3 border-t border-border/30">
          <ProfileStatusBar profile={profile} experiences={experiences} education={education} skills={skills} />
        </div>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-border/30 space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-muted-foreground" onClick={() => setRoute('/dashboard')}>
            <LayoutDashboard className="size-3.5" /> Dashboard
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-muted-foreground" onClick={() => setRoute('/profile')}>
            <User className="size-3.5" /> Profile
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-muted-foreground" onClick={() => signOut()}>
            <LogOut className="size-3.5" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Mobile sidebar ───────────────────────────────────── */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-3 z-50">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2"><Sparkles className="size-5 text-primary" /> ResuMe AI</SheetTitle>
          </SheetHeader>
          <div className="p-3">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full mb-3" onClick={() => { createConversation(); setSidebarOpen(false); }}>
              <Plus className="size-4" /> New Chat
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="px-3 space-y-1 overflow-hidden">
              {conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  isActive={currentConversationId === conv.id}
                  onSelect={() => selectConversation(conv.id)}
                  onDelete={() => deleteConversation(conv.id)}
                  deleteConfirmId={deleteConfirm}
                  setDeleteConfirmId={setDeleteConfirm}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t space-y-1">
            <ProfileStatusBar profile={profile} experiences={experiences} education={education} skills={skills} />
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs" onClick={() => { setRoute('/dashboard'); setSidebarOpen(false); }}>
              <LayoutDashboard className="size-3.5" /> Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs" onClick={() => { setRoute('/profile'); setSidebarOpen(false); }}>
              <User className="size-3.5" /> Profile
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-destructive" onClick={() => signOut()}>
              <LogOut className="size-3.5" /> Sign Out
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Main chat area ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Chat header */}
        <header className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-border/30 bg-background/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="md:hidden w-8" />
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="size-4 text-primary" />
              </div>
              <div>
                <h1 className="text-sm font-semibold">AI Resume Assistant</h1>
                <p className="text-[10px] text-muted-foreground">You confirm — AI never auto-saves</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasPendingOrConfirmed && (
              <Badge variant="secondary" className="text-[10px] gap-1">
                <FileDown className="size-3" />{confirmedCount}/{pendingFields.length} confirmed
              </Badge>
            )}
            {session?.user?.name && (
              <Avatar className="size-7">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {session.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </header>

        {/* Messages area */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Empty state */}
            {!currentConversationId && chatMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                  <Sparkles className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">How can I help you?</h2>
                <p className="text-muted-foreground text-center mb-3 max-w-md">
                  Tell me about the job you want and your background. I&apos;ll extract your info and ask you to confirm before saving.
                </p>
                <ProfileStatusBar profile={profile} experiences={experiences} education={education} skills={skills} />
                <div className="grid gap-3 w-full max-w-lg sm:grid-cols-2 mt-6">
                  {EXAMPLE_PROMPTS.map((prompt) => (
                    <button key={prompt.title} onClick={() => handleExampleClick(prompt.description)}
                      className="flex items-start gap-3 rounded-xl border border-border/40 p-4 text-left transition-all hover:border-primary/30 hover:bg-primary/5">
                      <span className="text-xl">{prompt.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{prompt.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{prompt.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {chatMessages.length > 0 && (
              <div className="space-y-6">
                {chatMessages.map((msg, idx) => (
                  <div key={msg.id || idx} className="flex gap-3">
                    <Avatar className="size-7 shrink-0 mt-0.5">
                      <AvatarFallback className={`text-[10px] ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {msg.role === 'assistant' ? <Sparkles className="size-3.5" /> : <User className="size-3.5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-muted-foreground mb-1.5">
                        {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                      </div>

                      {/* Show image if present */}
                      {msg.imageUrl && renderMessageImage(msg.imageUrl)}

                      {/* Show text content (skip [Image] placeholder if image exists) */}
                      {!(msg.imageUrl && msg.content === '[Image]') && msg.content && (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      )}

                      {/* Show extracted info cards inline */}
                      {msg.role === 'assistant' && msg.extractedInfo && Array.isArray(msg.extractedInfo) && msg.extractedInfo.length > 0 && (
                        <ExtractedInfoCard
                          fields={msg.extractedInfo as ExtractedField[]}
                          onConfirm={handleConfirmField}
                          onReject={handleRejectField}
                          onEdit={handleEditField}
                          onConfirmAll={handleConfirmAll}
                          onRejectAll={handleRejectAll}
                        />
                      )}
                    </div>
                  </div>
                ))}

                {aiLoading && (
                  <div className="flex gap-3">
                    <Avatar className="size-7 shrink-0 mt-0.5">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        <Sparkles className="size-3.5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 py-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Save bar */}
        {hasPendingOrConfirmed && confirmedCount > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="border-t border-primary/20 bg-primary/5 px-4 py-3 shrink-0">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="size-4 text-primary" />
                <span><strong>{confirmedCount}</strong> field{confirmedCount !== 1 ? 's' : ''} confirmed</span>
                {pendingFields.filter(f => f.status === 'pending').length > 0 && (
                  <span className="text-muted-foreground text-xs">({pendingFields.filter(f => f.status === 'pending').length} pending)</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => setRoute('/profile')}>
                  <User className="size-3" /> View Profile
                </Button>
                <Button size="sm" className="text-xs gap-1.5" onClick={saveConfirmedFields}>
                  <CheckCircle2 className="size-3" /> Save to Profile
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input area */}
        <div className="border-t border-border/30 p-4 shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Image preview */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 overflow-hidden"
                >
                  <div className="relative inline-flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 p-2">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-h-[120px] max-w-[200px] rounded-md object-contain"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground max-w-[120px] truncate">{selectedImageName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[10px] text-destructive hover:text-destructive gap-1 px-2"
                        onClick={removeSelectedImage}
                      >
                        <X className="size-3" /> Remove
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end gap-2">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />

              {/* Image upload button */}
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 size-10 text-muted-foreground hover:text-foreground"
                onClick={() => fileInputRef.current?.click()}
                disabled={aiLoading}
                title="Upload image"
              >
                <Paperclip className="size-5" />
              </Button>

              <div className="flex-1">
                <Textarea ref={inputRef} value={inputMessage} onChange={handleInputChange} onKeyDown={handleKeyDown}
                  placeholder={currentConversationId ? "Type your message... (Shift+Enter for new line)" : "Start a conversation..."}
                  className="resize-none min-h-[44px] max-h-[200px] pr-4 text-sm" disabled={aiLoading} rows={1} />
              </div>
              <Button size="icon" onClick={sendMessage} disabled={(!inputMessage.trim() && !selectedImage) || aiLoading} className="shrink-0 size-10">
                {aiLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              🔒 AI extracts your info — you confirm before saving. Edit or reject anything incorrect.
            </p>
          </div>
        </div>
      </main>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm mx-4">
            <h3 className="font-semibold mb-2">Delete conversation?</h3>
            <p className="text-sm text-muted-foreground mb-4">This will permanently delete this conversation and all its messages.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={() => deleteConversation(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
