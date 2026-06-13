import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import ZAI from "z-ai-web-dev-sdk"

const SYSTEM_PROMPT = `You are an expert resume writer and career coach. You help users create compelling, professional resume content. Always respond with clean, well-formatted content that can be directly used in a resume. Do not include any markdown formatting like bold or headers unless specifically asked. Be concise, impactful, and action-oriented.`

function buildPrompt(type: string, context: Record<string, unknown>): string {
  switch (type) {
    case "summary": {
      const { firstName, lastName, jobTitle, experiences, skills, summary: existingSummary } = context as Record<string, unknown> & {
        firstName?: string
        lastName?: string
        jobTitle?: string
        experiences?: Array<{ position: string; company: string; description?: string }>
        skills?: Array<{ name: string; category: string }>
        summary?: string
      }
      const name = [firstName, lastName].filter(Boolean).join(" ")
      const expText = (experiences || [])
        .map((e) => `${e.position} at ${e.company}${e.description ? ` - ${e.description}` : ""}`)
        .join("; ")
      const skillsText = (skills || []).map((s) => s.name).join(", ")

      return `Generate a professional resume summary for ${name || "a professional"}${jobTitle ? `, a ${jobTitle}` : ""}.${expText ? ` They have experience in: ${expText}.` : ""}${skillsText ? ` Their skills include: ${skillsText}.` : ""}${existingSummary ? ` Existing summary to improve: "${existingSummary}"` : ""} 

Write a compelling 2-3 sentence professional summary that highlights their key strengths and career focus. Use action verbs and quantifiable achievements where possible.`
    }

    case "experience": {
      const { position, company, description } = context as {
        position?: string
        company?: string
        description?: string
      }
      return `Generate 3-5 impactful bullet points for a resume experience entry:${position ? `\nPosition: ${position}` : ""}${company ? `\nCompany: ${company}` : ""}${description ? `\nCurrent description: ${description}` : ""}

Write action-oriented bullet points starting with strong action verbs. Include quantifiable results where possible. Format each bullet point on a new line starting with "•". Do not include any other formatting.`
    }

    case "skills": {
      const { jobTitle, currentSkills } = context as {
        jobTitle?: string
        currentSkills?: string[]
      }
      const currentSkillsText = currentSkills?.length
        ? `\nCurrent skills: ${currentSkills.join(", ")}`
        : ""
      return `Suggest relevant professional skills for a ${jobTitle || "professional"}.${currentSkillsText}

Return a JSON array of skill objects with "name" and "category" fields. Categories should be one of: "technical", "soft", "language", "tool", "certification". Suggest 8-12 relevant skills. Return ONLY the JSON array, no other text.`
    }

    case "cover-letter": {
      const { companyName, jobTitle, profileName, summary, experiences, skills, education } = context as {
        companyName?: string
        jobTitle?: string
        profileName?: string
        summary?: string
        experiences?: Array<{ position: string; company: string; description?: string }>
        skills?: Array<{ name: string }>
        education?: Array<{ institution: string; degree: string; field?: string }>
      }
      const expText = (experiences || [])
        .slice(0, 3)
        .map((e) => `${e.position} at ${e.company}`)
        .join(", ")
      const skillsText = (skills || []).slice(0, 8).map((s) => s.name).join(", ")
      const eduText = (education || [])
        .slice(0, 2)
        .map((e) => `${e.degree}${e.field ? ` in ${e.field}` : ""} from ${e.institution}`)
        .join("; ")

      return `Write a professional cover letter for ${profileName || "the applicant"} applying for the ${jobTitle || "position"} role at ${companyName || "the company"}.

${summary ? `Professional summary: ${summary}` : ""}
${expText ? `Relevant experience: ${expText}` : ""}
${skillsText ? `Key skills: ${skillsText}` : ""}
${eduText ? `Education: ${eduText}` : ""}

Write a concise, compelling cover letter with 3-4 paragraphs:
1. Opening with enthusiasm for the role
2. Highlight relevant experience and achievements
3. Connect skills to the role requirements  
4. Strong closing with call to action

Keep it professional but personable. Do not include placeholder text like [Date] or [Address].`
    }

    case "analyze-job": {
      const { jobDescription, chatHistory } = context as {
        jobDescription?: string
        chatHistory?: Array<{ role: string; content: string }>
      }
      const chatContext = chatHistory?.length
        ? `\n\nConversation so far:\n${chatHistory.map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`).join("\n")}`
        : ""
      return `You are a career expert analyzing a job target for a resume. The user wants to create a resume for this job:

${jobDescription || "Not specified yet"}
${chatContext}

Based on the job description and conversation, provide a comprehensive analysis as a JSON object with these fields:
- "jobTitle": The specific job title to target
- "industry": The industry/sector
- "relevantSkills": Array of objects with "name" and "category" (technical/soft/language/other) for skills that would be most relevant
- "suggestedSections": Array of section names that should appear on the resume (e.g. ["personal", "summary", "experience", "education", "skills", "certifications", "projects"])
- "keyQualifications": Array of the top 5-8 key qualifications/requirements for this role
- "suggestedSummary": A suggested professional summary paragraph (2-3 sentences) tailored for this job
- "fieldRequirements": Array of objects with "section" (personal/summary/experience/education/skills/certifications/projects/languages/volunteer), "required" (boolean), "label" (display name), "description" (what to include), "placeholders" (array of example values)

IMPORTANT: Return ONLY the JSON object, no other text. Make sure the JSON is valid.`
    }

    case "polish-resume": {
      const { profile, experiences, education, skills, jobTitle, jobDescription, summary } = context as {
        profile?: { firstName?: string; lastName?: string; jobTitle?: string; email?: string; phone?: string; location?: string; website?: string; linkedin?: string; github?: string }
        experiences?: Array<{ id?: string; company: string; position: string; description?: string; startDate: string; endDate?: string; current: boolean }>
        education?: Array<{ id?: string; institution: string; degree: string; field?: string; startDate: string; endDate?: string }>
        skills?: Array<{ id?: string; name: string; category: string }>
        jobTitle?: string
        jobDescription?: string
        summary?: string
      }
      const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || "the candidate"
      const expText = (experiences || []).map((e) => 
        `- ${e.position} at ${e.company}${e.description ? `: ${e.description}` : ""}`
      ).join("\n")
      const eduText = (education || []).map((e) => 
        `- ${e.degree}${e.field ? ` in ${e.field}` : ""} from ${e.institution}`
      ).join("\n")
      const skillsText = (skills || []).map((s) => s.name).join(", ")

      return `You are an expert resume writer polishing resume content for ${name} who is targeting a ${jobTitle || "professional"} role${jobDescription ? `: ${jobDescription}` : ""}.

Current resume content:
- Summary: ${summary || "Not provided"}
- Experience:\n${expText || "None"}
- Education:\n${eduText || "None"}
- Skills: ${skillsText || "None"}

Polish and improve ALL the resume content. Return a JSON object with these fields:
- "summary": A polished, compelling 2-3 sentence professional summary tailored to the target job
- "experienceBullets": An object where keys are experience entry IDs (or indices like "0", "1", "2" if no IDs) and values are arrays of 3-5 polished bullet points for each experience. Use strong action verbs, quantify achievements where possible, and tailor to the target role.
- "skills": Array of objects with "name" and "category" (technical/soft/language/other) - the polished and optimized skills list for this target role
- "suggestedTemplate": One of "minimal", "modern", "professional", "creative", "executive", "compact" - the best template for this type of role
- "suggestedTemplateReason": A brief explanation of why this template is recommended

IMPORTANT: Return ONLY the JSON object, no other text. Make sure the JSON is valid.`
    }

    case "chat": {
      const { message, chatHistory, jobDescription } = context as {
        message?: string
        chatHistory?: Array<{ role: string; content: string }>
        jobDescription?: string
      }
      const chatContext = chatHistory?.length
        ? `\n\nPrevious conversation:\n${chatHistory.map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`).join("\n")}`
        : ""
      return `You are an AI career coach helping a user create the perfect resume. The user has described their target job as: "${jobDescription || "Not specified yet"}"
${chatContext}

User's latest message: ${message}

Respond conversationally to help them. Ask clarifying questions about their background, experience, and career goals if needed to build a great resume. Be encouraging and professional. If you have enough information to proceed with resume creation, tell the user they can generate the resume structure now. Keep responses concise (2-4 sentences unless asking multiple questions).`
    }

    default:
      return "Generate professional resume content."
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, context } = body

    if (!type || !context) {
      return NextResponse.json(
        { error: "Type and context are required" },
        { status: 400 }
      )
    }

    const validTypes = ["summary", "experience", "skills", "cover-letter", "analyze-job", "polish-resume", "chat"]
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      )
    }

    const userPrompt = buildPrompt(type, context)

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      thinking: { type: "disabled" },
    })

    let content = completion.choices[0]?.message?.content || ""

    // For types that return JSON, try to parse and validate
    if (type === "skills" || type === "analyze-job" || type === "polish-resume") {
      try {
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/) || content.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          return NextResponse.json({ content: parsed, type })
        }
      } catch {
        // If parsing fails, return raw content
      }
    }

    return NextResponse.json({ content, type })
  } catch (error) {
    console.error("AI Generate error:", error)
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    )
  }
}
