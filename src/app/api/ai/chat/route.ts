import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import ZAI from "z-ai-web-dev-sdk"

const SYSTEM_PROMPT = `You are an expert AI resume assistant and career coach integrated into a resume builder app called ResuMe AI. Your primary role is to help users create perfect, tailored resumes by understanding their background and target jobs.

CRITICAL CAPABILITIES:
1. You can UPDATE the user's profile information through conversation. When the user tells you about themselves, you should detect and extract their information.
2. You have MEMORY - you remember everything the user tells you across this conversation.
3. You can analyze job descriptions and suggest resume structures.
4. You can generate resume content tailored for specific jobs.

HOW TO HANDLE PROFILE UPDATES:
When the user provides personal information (name, email, phone, location, job title, skills, experience, education, etc.), you MUST include a JSON block at the END of your response to update their profile. Format:

<<<PROFILE_UPDATE>>>
{
  "firstName": "...",
  "lastName": "...",
  "jobTitle": "...",
  "email": "...",
  "phone": "...",
  "location": "...",
  "website": "...",
  "linkedin": "...",
  "github": "...",
  "summary": "...",
  "experiences": [{"company": "...", "position": "...", "startDate": "...", "endDate": "...", "current": false, "description": "..."}],
  "education": [{"institution": "...", "degree": "...", "field": "...", "startDate": "...", "endDate": "..."}],
  "skills": [{"name": "...", "category": "technical|soft|language|other"}]
}
<<<END_PROFILE_UPDATE>>>

RULES:
- Only include fields that the user has mentioned or implied. Don't make up values.
- For experiences/education/skills, include the COMPLETE list as you understand it (merge with previous info).
- When the user says "My name is John Doe", extract firstName="John", lastName="Doe".
- When the user mentions a skill, add it to the skills array.
- When the user talks about work experience, add it to experiences.
- When the user mentions their education, add it to education.
- Always be conversational and encouraging in your main response.
- The profile update block is INVISIBLE to the user - it's processed by the system.
- Keep your conversational responses concise (2-4 sentences typically) unless the user asks for detailed help.
- If the user asks to change something, update the relevant field and confirm the change.
- You can suggest resume improvements, restructure content for different jobs, and tailor the resume.

RESPONSE STYLE:
- Be professional but friendly, like ChatGPT
- Use markdown formatting for better readability (bold, lists, etc.)
- When giving resume advice, be specific and actionable
- When the user describes a target job, analyze what makes a good resume for that role
- Proactively ask for missing information that would strengthen their resume`

function buildContextMessages(
  chatHistory: Array<{ role: string; content: string }>,
  userProfile: Record<string, unknown>,
  targetJob: string
): Array<{ role: string; content: string }> {
  const messages: Array<{ role: string; content: string }> = [
    {
      role: "assistant",
      content: SYSTEM_PROMPT + `\n\nCURRENT USER PROFILE:\n${JSON.stringify(userProfile, null, 2)}\n\nTARGET JOB: ${targetJob || "Not specified yet"}`,
    },
  ]

  // Add conversation history (limit to last 20 messages for context)
  const recentHistory = chatHistory.slice(-20)
  for (const msg of recentHistory) {
    // Strip profile update blocks from history so AI doesn't repeat them
    const cleanContent = msg.content.replace(/<<<PROFILE_UPDATE>>>[\s\S]*?<<<END_PROFILE_UPDATE>>>/g, "").trim()
    if (cleanContent) {
      messages.push({
        role: msg.role as "user" | "assistant",
        content: cleanContent,
      })
    }
  }

  return messages
}

function extractProfileUpdate(content: string): { cleanContent: string; updates: Record<string, unknown> | null } {
  const match = content.match(/<<<PROFILE_UPDATE>>>([\s\S]*?)<<<END_PROFILE_UPDATE>>>/)
  if (!match) return { cleanContent: content, updates: null }

  const cleanContent = content.replace(/<<<PROFILE_UPDATE>>>[\s\S]*?<<<END_PROFILE_UPDATE>>>/g, "").trim()
  try {
    const updates = JSON.parse(match[1].trim())
    return { cleanContent, updates }
  } catch {
    return { cleanContent: content, updates: null }
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { message, conversationId } = body

    if (!message || !conversationId) {
      return NextResponse.json({ error: "Message and conversationId required" }, { status: 400 })
    }

    // Verify conversation ownership
    const conversation = await db.chatConversation.findUnique({
      where: { id: conversationId },
    })

    if (!conversation || conversation.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // Save user message
    await db.chatMessage.create({
      data: {
        conversationId,
        role: "user",
        content: message,
      },
    })

    // Get conversation history
    const dbMessages = await db.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    })

    // Get user profile for context
    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        experiences: { orderBy: { order: "asc" } },
        education: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
      },
    })

    const userProfile: Record<string, unknown> = profile
      ? {
          firstName: profile.firstName,
          lastName: profile.lastName,
          jobTitle: profile.jobTitle,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          website: profile.website,
          linkedin: profile.linkedin,
          github: profile.github,
          summary: profile.summary,
          experiences: profile.experiences.map((e) => ({
            company: e.company,
            position: e.position,
            startDate: e.startDate,
            endDate: e.endDate,
            current: e.current,
            description: e.description,
          })),
          education: profile.education.map((e) => ({
            institution: e.institution,
            degree: e.degree,
            field: e.field,
            startDate: e.startDate,
            endDate: e.endDate,
          })),
          skills: profile.skills.map((s) => ({
            name: s.name,
            category: s.category,
          })),
        }
      : {}

    // Build context messages for AI
    const chatHistory = dbMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const contextMessages = buildContextMessages(chatHistory, userProfile, conversation.targetJob)

    // Call AI
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: contextMessages,
      thinking: { type: "disabled" },
    })

    let aiContent = completion.choices[0]?.message?.content || "I'm having trouble responding right now. Please try again."

    // Extract profile updates from response
    const { cleanContent, updates } = extractProfileUpdate(aiContent)

    // Apply profile updates if detected
    let appliedUpdates: Record<string, unknown> | null = null
    if (updates) {
      try {
        if (profile) {
          const updateData: Record<string, unknown> = {}

          // Simple string fields
          const stringFields = ["firstName", "lastName", "jobTitle", "email", "phone", "location", "website", "linkedin", "github", "summary"]
          for (const field of stringFields) {
            if (typeof updates[field] === "string" && updates[field]) {
              updateData[field] = updates[field]
            }
          }

          // Update profile
          if (Object.keys(updateData).length > 0) {
            await db.profile.update({
              where: { id: profile.id },
              data: updateData,
            })
            appliedUpdates = { ...appliedUpdates, ...updateData }
          }

          // Handle experiences
          if (Array.isArray(updates.experiences) && updates.experiences.length > 0) {
            await db.experience.deleteMany({ where: { profileId: profile.id } })
            for (let i = 0; i < updates.experiences.length; i++) {
              const exp = updates.experiences[i] as Record<string, unknown>
              await db.experience.create({
                data: {
                  profileId: profile.id,
                  company: (exp.company as string) || "",
                  position: (exp.position as string) || "",
                  location: (exp.location as string) || null,
                  startDate: (exp.startDate as string) || "",
                  endDate: (exp.endDate as string) || null,
                  current: (exp.current as boolean) || false,
                  description: (exp.description as string) || null,
                  order: i,
                },
              })
            }
            appliedUpdates = { ...appliedUpdates, experiences: updates.experiences }
          }

          // Handle education
          if (Array.isArray(updates.education) && updates.education.length > 0) {
            await db.education.deleteMany({ where: { profileId: profile.id } })
            for (let i = 0; i < updates.education.length; i++) {
              const edu = updates.education[i] as Record<string, unknown>
              await db.education.create({
                data: {
                  profileId: profile.id,
                  institution: (edu.institution as string) || "",
                  degree: (edu.degree as string) || "",
                  field: (edu.field as string) || null,
                  location: (edu.location as string) || null,
                  startDate: (edu.startDate as string) || "",
                  endDate: (edu.endDate as string) || null,
                  gpa: (edu.gpa as string) || null,
                  description: (edu.description as string) || null,
                  order: i,
                },
              })
            }
            appliedUpdates = { ...appliedUpdates, education: updates.education }
          }

          // Handle skills
          if (Array.isArray(updates.skills) && updates.skills.length > 0) {
            await db.skill.deleteMany({ where: { profileId: profile.id } })
            for (let i = 0; i < updates.skills.length; i++) {
              const skill = updates.skills[i] as Record<string, unknown>
              await db.skill.create({
                data: {
                  profileId: profile.id,
                  name: (skill.name as string) || "",
                  category: (skill.category as string) || "technical",
                  order: i,
                },
              })
            }
            appliedUpdates = { ...appliedUpdates, skills: updates.skills }
          }
        } else {
          // Create profile if it doesn't exist
          const updateData: Record<string, unknown> = {}
          const stringFields = ["firstName", "lastName", "jobTitle", "email", "phone", "location", "website", "linkedin", "github", "summary"]
          for (const field of stringFields) {
            if (typeof updates[field] === "string" && updates[field]) {
              updateData[field] = updates[field]
            }
          }

          const newProfile = await db.profile.create({
            data: {
              userId: session.user.id,
              ...updateData,
            } as Record<string, unknown>,
          })

          if (Array.isArray(updates.experiences) && updates.experiences.length > 0) {
            for (let i = 0; i < updates.experiences.length; i++) {
              const exp = updates.experiences[i] as Record<string, unknown>
              await db.experience.create({
                data: {
                  profileId: newProfile.id,
                  company: (exp.company as string) || "",
                  position: (exp.position as string) || "",
                  location: (exp.location as string) || null,
                  startDate: (exp.startDate as string) || "",
                  endDate: (exp.endDate as string) || null,
                  current: (exp.current as boolean) || false,
                  description: (exp.description as string) || null,
                  order: i,
                },
              })
            }
          }

          if (Array.isArray(updates.education) && updates.education.length > 0) {
            for (let i = 0; i < updates.education.length; i++) {
              const edu = updates.education[i] as Record<string, unknown>
              await db.education.create({
                data: {
                  profileId: newProfile.id,
                  institution: (edu.institution as string) || "",
                  degree: (edu.degree as string) || "",
                  field: (edu.field as string) || null,
                  location: (edu.location as string) || null,
                  startDate: (edu.startDate as string) || "",
                  endDate: (edu.endDate as string) || null,
                  gpa: (edu.gpa as string) || null,
                  description: (edu.description as string) || null,
                  order: i,
                },
              })
            }
          }

          if (Array.isArray(updates.skills) && updates.skills.length > 0) {
            for (let i = 0; i < updates.skills.length; i++) {
              const skill = updates.skills[i] as Record<string, unknown>
              await db.skill.create({
                data: {
                  profileId: newProfile.id,
                  name: (skill.name as string) || "",
                  category: (skill.category as string) || "technical",
                  order: i,
                },
              })
            }
          }

          appliedUpdates = updates
        }
      } catch (updateError) {
        console.error("Profile update error:", updateError)
      }
    }

    // Save AI message
    await db.chatMessage.create({
      data: {
        conversationId,
        role: "assistant",
        content: cleanContent,
        profileUpdates: appliedUpdates ? JSON.stringify(appliedUpdates) : "",
      },
    })

    // Update conversation title from first user message if still default
    if (conversation.title === "New Chat" && message) {
      const title = message.slice(0, 60) + (message.length > 60 ? "..." : "")
      await db.chatConversation.update({
        where: { id: conversationId },
        data: { title, targetJob: conversation.targetJob || message.slice(0, 200) },
      })
    } else {
      await db.chatConversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      })
    }

    return NextResponse.json({
      content: cleanContent,
      profileUpdates: appliedUpdates,
    })
  } catch (error) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: "Failed to process message. Please try again." },
      { status: 500 }
    )
  }
}
