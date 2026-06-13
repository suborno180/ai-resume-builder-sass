import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

const ADMIN_EMAIL = "suborno.dev@gmail.com";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Total users
    const totalUsers = await db.user.count();

    // Users with profiles
    const usersWithProfiles = await db.profile.count();

    // Total resumes
    const totalResumes = await db.resume.count();

    // Total conversations
    const totalConversations = await db.chatConversation.count();

    // Total messages
    const totalMessages = await db.chatMessage.count();

    // Recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = await db.user.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    // Active users (last 7 days - users with conversations)
    const activeUsers7d = await db.chatConversation.groupBy({
      by: ["userId"],
      where: { updatedAt: { gte: sevenDaysAgo } },
      _count: true,
    });

    // All users with details
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            jobTitle: true,
            image: true,
          },
        },
        _count: {
          select: {
            resumes: true,
            conversations: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Recent conversations
    const recentConversations = await db.chatConversation.findMany({
      take: 20,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        targetJob: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        _count: {
          select: { messages: true },
        },
      },
    });

    // Template usage
    const templateUsage = await db.resume.groupBy({
      by: ["templateId"],
      _count: true,
      orderBy: { _count: { templateId: "desc" } },
    });

    // Daily signup counts for last 14 days
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const recentUsersList = await db.user.findMany({
      where: { createdAt: { gte: fourteenDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by day
    const dailySignups: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dailySignups[key] = 0;
    }
    recentUsersList.forEach((u) => {
      const key = u.createdAt.toISOString().split("T")[0];
      if (key in dailySignups) {
        dailySignups[key]++;
      }
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        usersWithProfiles,
        totalResumes,
        totalConversations,
        totalMessages,
        recentSignups,
        activeUsers7d: activeUsers7d.length,
      },
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        profileName: u.profile
          ? [u.profile.firstName, u.profile.lastName].filter(Boolean).join(" ")
          : null,
        jobTitle: u.profile?.jobTitle ?? null,
        hasImage: !!u.profile?.image,
        resumeCount: u._count.resumes,
        conversationCount: u._count.conversations,
      })),
      recentConversations: recentConversations.map((c) => ({
        id: c.id,
        title: c.title,
        targetJob: c.targetJob,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        userEmail: c.user.email,
        userName: c.user.name,
        messageCount: c._count.messages,
      })),
      templateUsage: templateUsage.map((t) => ({
        templateId: t.templateId,
        count: t._count,
      })),
      dailySignups,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
