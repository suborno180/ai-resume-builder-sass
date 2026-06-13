import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import ZAI from "z-ai-web-dev-sdk"

// ── System Prompt (optimized for reliable extraction) ──────
const SYSTEM_PROMPT = `You are ResuMe AI, a professional resume assistant. You help users build perfect resumes through natural conversation.

CORE RULES:
1. NEVER save or auto-update anything. You ONLY extract info and PRESENT it for user confirmation.
2. When the user tells you information, ALWAYS extract it using the INFO block below.
3. NEVER assume or fabricate data. Only extract what the user explicitly says.
4. Be conversational and helpful like ChatGPT. Use markdown formatting for readability.
5. Always ask the user to confirm extracted info before considering it saved.
6. If the user corrects something, extract the corrected version.
7. If the user says "remove X" or "delete X", extract that field with action "remove".

EXTRACTION FORMAT - Use this EXACT format when you detect user information:

<<<INFO>>>
{"fields":[{"section":"personal","field":"firstName","label":"First Name","value":"John"},{"section":"personal","field":"lastName","label":"Last Name","value":"Doe"},{"section":"personal","field":"email","label":"Email","value":"john@email.com"},{"section":"personal","field":"phone","label":"Phone","value":"+8801712345678"},{"section":"personal","field":"location","label":"Location","value":"Dhaka"},{"section":"personal","field":"jobTitle","label":"Job Title","value":"Software Engineer"},{"section":"personal","field":"website","label":"Website","value":"https://example.com"},{"section":"personal","field":"linkedin","label":"LinkedIn","value":"linkedin.com/in/johndoe"},{"section":"personal","field":"github","label":"GitHub","value":"github.com/johndoe"},{"section":"summary","field":"summary","label":"Professional Summary","value":"A brief summary..."},{"section":"hobbies","field":"hobbies","label":"Hobbies & Interests","value":"Photography, Travel, Chess"},{"section":"experience","field":"experience","label":"Work Experience","value":[{"company":"Google","position":"Developer","startDate":"2022-01","endDate":"","current":true,"description":"Built scalable APIs"}]},{"section":"education","field":"education","label":"Education","value":[{"institution":"MIT","degree":"BSc","field":"CS","startDate":"2018-01","endDate":"2022-01"}]},{"section":"skills","field":"skills","label":"Skills","value":[{"name":"React","category":"technical"},{"name":"Leadership","category":"soft"},{"name":"English","category":"language"}]}]}
<<<END>>>

EXTRACTION RULES:
- Only include fields the user actually mentioned. Skip fields not mentioned.
- For skills, use categories: "technical", "soft", "language", "other"
- For experience: include company, position, startDate (YYYY-MM), endDate, current (boolean), description
- For education: include institution, degree, field, startDate, endDate
- For hobbies: combine all hobbies/interests into a single comma-separated string value
- To remove a field: add "action":"remove" to the field object

CONVERSATION FLOW:
1. Greet the user and ask what job they want a resume for
2. Collect their information naturally through conversation
3. ALWAYS extract info using the INFO block - this shows the user a confirmation card
4. When user asks to generate resume, include a GENERATE block:

<<<GENERATE>>>
{"targetJobTitle":"Job Title","targetJobDescription":"Description","ready":true}
<<<END>>>

NEVER suggest generating a resume unless the user explicitly asks. NEVER auto-generate.
Always end with a helpful follow-up question when appropriate.`

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

  // Add conversation history (limit to last 30 messages)
  const recentHistory = chatHistory.slice(-30)
  for (const msg of recentHistory) {
    // Strip extraction blocks from history so AI doesn't repeat them
    const cleanContent = msg.content
      .replace(/<<<INFO>>>[\s\S]*?<<<END>>>/g, "")
      .replace(/<<<GENERATE>>>[\s\S]*?<<<END>>>/g, "")
      .replace(/<<<EXTRACTED_INFO>>>[\s\S]*?<<<END_EXTRACTED_INFO>>>/g, "")
      .replace(/<<<PROFILE_UPDATE>>>[\s\S]*?<<<END_PROFILE_UPDATE>>>/g, "")
      .replace(/<<<GENERATE_RESUME>>>[\s\S]*?<<<END_GENERATE_RESUME>>>/g, "")
      .trim()
    if (cleanContent) {
      messages.push({
        role: msg.role as "user" | "assistant",
        content: cleanContent,
      })
    }
  }

  return messages
}

interface ExtractedFieldAPI {
  section: string
  field: string
  label: string
  value: string | Record<string, string> | Record<string, string>[]
  action?: string
}

function extractBlocks(content: string): {
  cleanContent: string
  extractedFields: ExtractedFieldAPI[] | null
  generateResume: { targetJobTitle: string; targetJobDescription: string; ready: boolean } | null
} {
  let cleanContent = content
  let extractedFields: ExtractedFieldAPI[] | null = null
  let generateResume: { targetJobTitle: string; targetJobDescription: string; ready: boolean } | null = null

  // ── Try new format: <<<INFO>>> ... <<<END>>> ──────────────
  const infoMatch = content.match(/<<<INFO>>>([\s\S]*?)<<<END>>>/)
  if (infoMatch) {
    cleanContent = cleanContent.replace(/<<<INFO>>>[\s\S]*?<<<END>>>/g, "").trim()
    try {
      const parsed = JSON.parse(infoMatch[1].trim())
      if (parsed.fields && Array.isArray(parsed.fields)) {
        extractedFields = parsed.fields
      }
    } catch { /* ignore */ }
  }

  // ── Try alternate format: <<<EXTRACTED_INFO>>> ... <<<END_EXTRACTED_INFO>>> ──
  if (!extractedFields) {
    const altMatch = content.match(/<<<EXTRACTED_INFO>>>([\s\S]*?)<<<END_EXTRACTED_INFO>>>/)
    if (altMatch) {
      cleanContent = cleanContent.replace(/<<<EXTRACTED_INFO>>>[\s\S]*?<<<END_EXTRACTED_INFO>>>/g, "").trim()
      try {
        const parsed = JSON.parse(altMatch[1].trim())
        if (parsed.fields && Array.isArray(parsed.fields)) {
          extractedFields = parsed.fields
        }
      } catch { /* ignore */ }
    }
  }

  // ── Fallback: Old format <<<PROFILE_UPDATE>>> ... <<<END_PROFILE_UPDATE>>> ──
  if (!extractedFields) {
    const oldMatch = content.match(/<<<PROFILE_UPDATE>>>([\s\S]*?)<<<END_PROFILE_UPDATE>>>/)
    if (oldMatch) {
      cleanContent = cleanContent.replace(/<<<PROFILE_UPDATE>>>[\s\S]*?<<<END_PROFILE_UPDATE>>>/g, "").trim()
      try {
        const parsed = JSON.parse(oldMatch[1].trim())
        // Convert old format to new field array
        const fields: ExtractedFieldAPI[] = []
        
        // Simple string fields
        const stringFields = ["firstName", "lastName", "jobTitle", "email", "phone", "location", "website", "linkedin", "github", "summary"]
        const labelMap: Record<string, string> = {
          firstName: "First Name", lastName: "Last Name", jobTitle: "Job Title",
          email: "Email", phone: "Phone", location: "Location",
          website: "Website", linkedin: "LinkedIn", github: "GitHub", summary: "Professional Summary"
        }
        
        for (const field of stringFields) {
          if (typeof parsed[field] === "string" && parsed[field]) {
            fields.push({
              section: field === "summary" ? "summary" : "personal",
              field,
              label: labelMap[field] || field,
              value: parsed[field],
            })
          }
        }

        // Experiences
        if (Array.isArray(parsed.experiences) && parsed.experiences.length > 0) {
          fields.push({
            section: "experience",
            field: "experience",
            label: "Work Experience",
            value: parsed.experiences,
          })
        }

        // Education
        if (Array.isArray(parsed.education) && parsed.education.length > 0) {
          fields.push({
            section: "education",
            field: "education",
            label: "Education",
            value: parsed.education,
          })
        }

        // Skills
        if (Array.isArray(parsed.skills) && parsed.skills.length > 0) {
          fields.push({
            section: "skills",
            field: "skills",
            label: "Skills",
            value: parsed.skills,
          })
        }

        if (fields.length > 0) {
          extractedFields = fields
        }
      } catch { /* ignore */ }
    }
  }

  // ── Try new generate format ───────────────────────────────
  const genMatch = content.match(/<<<GENERATE>>>([\s\S]*?)<<<END>>>/)
  if (genMatch) {
    cleanContent = cleanContent.replace(/<<<GENERATE>>>[\s\S]*?<<<END>>>/g, "").trim()
    try {
      generateResume = JSON.parse(genMatch[1].trim())
    } catch { /* ignore */ }
  }

  // ── Try alternate generate format ─────────────────────────
  if (!generateResume) {
    const altGenMatch = content.match(/<<<GENERATE_RESUME>>>([\s\S]*?)<<<END_GENERATE_RESUME>>>/)
    if (altGenMatch) {
      cleanContent = cleanContent.replace(/<<<GENERATE_RESUME>>>[\s\S]*?<<<END_GENERATE_RESUME>>>/g, "").trim()
      try {
        generateResume = JSON.parse(altGenMatch[1].trim())
      } catch { /* ignore */ }
    }
  }

  return { cleanContent, extractedFields, generateResume }
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
      data: { conversationId, role: "user", content: message },
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
          hobbies: profile.hobbies,
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

    // Extract blocks from AI response
    const { cleanContent, extractedFields, generateResume } = extractBlocks(aiContent)

    // Generate unique IDs for extracted fields
    const fieldsWithIds = extractedFields?.map((f, i) => ({
      ...f,
      id: `field_${Date.now()}_${i}`,
      status: "pending" as const,
    })) || null

    // Save AI message
    await db.chatMessage.create({
      data: {
        conversationId,
        role: "assistant",
        content: cleanContent,
        profileUpdates: fieldsWithIds ? JSON.stringify(fieldsWithIds) : "",
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
      extractedFields: fieldsWithIds,
      generateResume,
    })
  } catch (error) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: "Failed to process message. Please try again." },
      { status: 500 }
    )
  }
}
