'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Activity,
  ChevronDown,
  ChevronUp,
  Mail,
  Calendar,
  ShieldCheck,
  BarChart3,
  Eye,
  Clock,
  UserCheck,
  UserPlus,
  Image as ImageIcon,
} from 'lucide-react';

const ADMIN_EMAIL = 'suborno.dev@gmail.com';

interface AdminStats {
  totalUsers: number;
  usersWithProfiles: number;
  totalResumes: number;
  totalConversations: number;
  totalMessages: number;
  recentSignups: number;
  activeUsers7d: number;
}

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  profileName: string | null;
  jobTitle: string | null;
  hasImage: boolean;
  resumeCount: number;
  conversationCount: number;
}

interface AdminConversation {
  id: string;
  title: string;
  targetJob: string;
  createdAt: string;
  updatedAt: string;
  userEmail: string;
  userName: string | null;
  messageCount: number;
}

interface AdminData {
  stats: AdminStats;
  users: AdminUser[];
  recentConversations: AdminConversation[];
  templateUsage: { templateId: string; count: number }[];
  dailySignups: Record<string, number>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AdminPanel() {
  const { data: session } = useSession();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const fetchAdminData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const json = await res.json();
        setData(json as AdminData);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.email === ADMIN_EMAIL) {
      fetchAdminData();
    }
  }, [session, fetchAdminData]);

  // Don't render anything if not admin
  if (session?.user?.email !== ADMIN_EMAIL) return null;

  if (loading) {
    return (
      <motion.div variants={itemVariants} className="mb-8">
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-5 flex items-center gap-3">
            <Activity className="size-5 text-amber-500 animate-pulse" />
            <span className="text-sm text-amber-600">Loading admin stats...</span>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!data) return null;

  const { stats, users, recentConversations, templateUsage, dailySignups } = data;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
      {/* Admin Header - Collapsible */}
      <motion.div variants={itemVariants}>
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full -translate-y-12 translate-x-12" />
          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/15 shrink-0">
                  <ShieldCheck className="size-5 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    Admin Dashboard
                    <Badge className="text-[10px] bg-amber-500/15 text-amber-600 border-amber-500/20">
                      MASTER
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Monitor app usage, users, and activity
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-amber-600 hover:bg-amber-500/10"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Collapse' : 'Expand'}
                {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </Button>
            </div>
          </CardHeader>

          {/* Quick Stats Row - Always Visible */}
          <CardContent className="pt-0 relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-background/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Users className="size-3.5 text-amber-600" />
                  <span className="text-xs text-muted-foreground">Users</span>
                </div>
                <p className="text-xl font-bold">{stats.totalUsers}</p>
              </div>
              <div className="rounded-lg bg-background/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <FileText className="size-3.5 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Resumes</span>
                </div>
                <p className="text-xl font-bold">{stats.totalResumes}</p>
              </div>
              <div className="rounded-lg bg-background/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <MessageSquare className="size-3.5 text-sky-600" />
                  <span className="text-xs text-muted-foreground">Chats</span>
                </div>
                <p className="text-xl font-bold">{stats.totalConversations}</p>
              </div>
              <div className="rounded-lg bg-background/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <TrendingUp className="size-3.5 text-rose-600" />
                  <span className="text-xs text-muted-foreground">Active 7d</span>
                </div>
                <p className="text-xl font-bold">{stats.activeUsers7d}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Detailed Stats Row */}
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { label: 'Total Messages', value: stats.totalMessages, icon: MessageSquare, color: 'text-sky-600' },
                  { label: 'With Profiles', value: stats.usersWithProfiles, icon: UserCheck, color: 'text-emerald-600' },
                  { label: 'New (7d)', value: stats.recentSignups, icon: UserPlus, color: 'text-amber-600' },
                  { label: 'Active (7d)', value: stats.activeUsers7d, icon: Activity, color: 'text-rose-600' },
                  { label: 'Conversations', value: stats.totalConversations, icon: MessageSquare, color: 'text-violet-600' },
                  { label: 'Resumes', value: stats.totalResumes, icon: FileText, color: 'text-teal-600' },
                ].map((s) => (
                  <Card key={s.label} className="border-border/30">
                    <CardContent className="p-3 flex items-center gap-2">
                      <s.icon className={`size-4 ${s.color} shrink-0`} />
                      <div>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="text-lg font-bold">{s.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Daily Signups Chart */}
              <Card className="border-border/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="size-4 text-amber-600" />
                    <CardTitle className="text-sm">Signups (Last 14 Days)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1 h-24">
                    {Object.entries(dailySignups).map(([date, count]) => {
                      const maxCount = Math.max(...Object.values(dailySignups), 1);
                      const height = Math.max((count / maxCount) * 100, 4);
                      return (
                        <div key={date} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[9px] text-muted-foreground">{count || ''}</span>
                          <div
                            className="w-full rounded-t bg-amber-500/60 hover:bg-amber-500/80 transition-colors min-h-[3px]"
                            style={{ height: `${height}%` }}
                            title={`${date}: ${count} signups`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {Object.keys(dailySignups).map((date) => (
                      <div key={date} className="flex-1 text-center">
                        <span className="text-[8px] text-muted-foreground">
                          {date.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Users & Conversations */}
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="users" className="text-xs gap-1.5">
                    <Users className="size-3" /> Users
                  </TabsTrigger>
                  <TabsTrigger value="conversations" className="text-xs gap-1.5">
                    <MessageSquare className="size-3" /> Chats
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="text-xs gap-1.5">
                    <FileText className="size-3" /> Templates
                  </TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users">
                  <Card className="border-border/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">All Users ({users.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-xs">
                          <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                            <tr className="border-b">
                              <th className="text-left p-2 font-medium">User</th>
                              <th className="text-left p-2 font-medium hidden sm:table-cell">Job Title</th>
                              <th className="text-center p-2 font-medium">Resumes</th>
                              <th className="text-center p-2 font-medium">Chats</th>
                              <th className="text-left p-2 font-medium hidden md:table-cell">Joined</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((u) => (
                              <tr key={u.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                                <td className="p-2">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="size-6">
                                      <AvatarFallback className="text-[9px] bg-amber-500/10 text-amber-600">
                                        {(u.profileName || u.name || u.email).slice(0, 2).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                      <p className="font-medium truncate max-w-[140px]">
                                        {u.profileName || u.name || '—'}
                                      </p>
                                      <p className="text-muted-foreground truncate max-w-[140px] flex items-center gap-0.5">
                                        <Mail className="size-2.5 shrink-0" />
                                        {u.email}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-2 hidden sm:table-cell">
                                  <div className="flex items-center gap-1">
                                    {u.hasImage && <ImageIcon className="size-2.5 text-emerald-500" />}
                                    <span className="truncate max-w-[120px]">{u.jobTitle || '—'}</span>
                                  </div>
                                </td>
                                <td className="p-2 text-center">
                                  <Badge variant="outline" className="text-[10px]">
                                    {u.resumeCount}
                                  </Badge>
                                </td>
                                <td className="p-2 text-center">
                                  <Badge variant="outline" className="text-[10px]">
                                    {u.conversationCount}
                                  </Badge>
                                </td>
                                <td className="p-2 text-muted-foreground hidden md:table-cell">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="size-2.5" />
                                    {new Date(u.createdAt).toLocaleDateString()}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Conversations Tab */}
                <TabsContent value="conversations">
                  <Card className="border-border/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Recent Conversations ({recentConversations.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-xs">
                          <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                            <tr className="border-b">
                              <th className="text-left p-2 font-medium">Conversation</th>
                              <th className="text-left p-2 font-medium hidden sm:table-cell">User</th>
                              <th className="text-center p-2 font-medium">Msgs</th>
                              <th className="text-left p-2 font-medium hidden md:table-cell">Last Active</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentConversations.map((c) => (
                              <tr key={c.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                                <td className="p-2">
                                  <div className="min-w-0">
                                    <p className="font-medium truncate max-w-[180px]">{c.title}</p>
                                    {c.targetJob && (
                                      <p className="text-muted-foreground truncate max-w-[180px] flex items-center gap-0.5">
                                        <Eye className="size-2.5 shrink-0" />
                                        {c.targetJob}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="p-2 hidden sm:table-cell">
                                  <p className="truncate max-w-[140px]">{c.userName || '—'}</p>
                                  <p className="text-muted-foreground truncate max-w-[140px]">{c.userEmail}</p>
                                </td>
                                <td className="p-2 text-center">
                                  <Badge variant="outline" className="text-[10px]">
                                    {c.messageCount}
                                  </Badge>
                                </td>
                                <td className="p-2 text-muted-foreground hidden md:table-cell">
                                  <div className="flex items-center gap-1">
                                    <Clock className="size-2.5" />
                                    {new Date(c.updatedAt).toLocaleDateString()}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates">
                  <Card className="border-border/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Template Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {templateUsage.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-4">No resumes created yet</p>
                        ) : (
                          templateUsage.map((t) => {
                            const maxCount = Math.max(...templateUsage.map((x) => x.count), 1);
                            const pct = (t.count / maxCount) * 100;
                            return (
                              <div key={t.templateId} className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-medium capitalize">{t.templateId}</span>
                                  <span className="text-muted-foreground">{t.count} resumes</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-500/60 rounded-full transition-all"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
