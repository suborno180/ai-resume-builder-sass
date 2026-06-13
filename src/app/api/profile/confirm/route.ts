import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

// POST /api/profile/confirm - Save confirmed profile fields (from AI chat extraction)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { fields } = body as { fields: Array<{
      section: string
      field: string
      value: string | Record<string, string> | Record<string, string>[]
      action?: string
      status: string
    }> }

    if (!fields || !Array.isArray(fields)) {
      return NextResponse.json({ error: "Fields array required" }, { status: 400 })
    }

    // Only process confirmed/edited fields
    const confirmedFields = fields.filter(f => f.status === 'confirmed' || f.status === 'edited')
    if (confirmedFields.length === 0) {
      return NextResponse.json({ success: true, saved: 0 })
    }

    // Get or create profile
    let profile = await db.profile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      profile = await db.profile.create({
        data: { userId: session.user.id },
      })
    }

    // Group fields by section
    const personalFields: Record<string, unknown> = {}
    const experienceEntries: Array<Record<string, string>> = []
    const educationEntries: Array<Record<string, string>> = []
    const skillEntries: Array<Record<string, string>> = []
    let summaryValue: string | null = null
    let hobbiesValue: string | null = null
    const fieldsToRemove: string[] = []

    for (const field of confirmedFields) {
      if (field.action === 'remove') {
        fieldsToRemove.push(field.field)
        continue
      }

      if (field.section === 'personal') {
        if (typeof field.value === 'string') {
          // Handle edited values
          const val = field.status === 'edited' && field.editedValue ? field.editedValue : field.value
          personalFields[field.field] = typeof val === 'string' ? val : String(val)
        }
      } else if (field.section === 'summary') {
        const val = field.status === 'edited' && field.editedValue ? field.editedValue : field.value
        if (typeof val === 'string') {
          summaryValue = val
        }
      } else if (field.section === 'hobbies') {
        const val = field.status === 'edited' && field.editedValue ? field.editedValue : field.value
        if (typeof val === 'string') {
          hobbiesValue = val
        }
      } else if (field.section === 'experience') {
        const rawVal = field.status === 'edited' && field.editedValue ? field.editedValue : field.value
        if (Array.isArray(rawVal)) {
          for (const exp of rawVal) {
            if (typeof exp === 'object' && exp !== null) {
              experienceEntries.push(exp as Record<string, string>)
            }
          }
        } else if (typeof rawVal === 'object' && rawVal !== null) {
          experienceEntries.push(rawVal as Record<string, string>)
        }
      } else if (field.section === 'education') {
        const rawVal = field.status === 'edited' && field.editedValue ? field.editedValue : field.value
        if (Array.isArray(rawVal)) {
          for (const edu of rawVal) {
            if (typeof edu === 'object' && edu !== null) {
              educationEntries.push(edu as Record<string, string>)
            }
          }
        } else if (typeof rawVal === 'object' && rawVal !== null) {
          educationEntries.push(rawVal as Record<string, string>)
        }
      } else if (field.section === 'skills') {
        const rawVal = field.status === 'edited' && field.editedValue ? field.editedValue : field.value
        if (Array.isArray(rawVal)) {
          for (const skill of rawVal) {
            if (typeof skill === 'object' && skill !== null) {
              skillEntries.push(skill as Record<string, string>)
            }
          }
        } else if (typeof rawVal === 'object' && rawVal !== null) {
          skillEntries.push(rawVal as Record<string, string>)
        }
      }
    }

    // Handle removals
    if (fieldsToRemove.length > 0) {
      const removeData: Record<string, null> = {}
      for (const f of fieldsToRemove) {
        removeData[f] = null
      }
      await db.profile.update({
        where: { id: profile.id },
        data: removeData,
      })
    }

    // Update personal fields + summary + hobbies
    const updateData: Record<string, unknown> = { ...personalFields }
    if (summaryValue !== null) {
      updateData.summary = summaryValue
    }
    if (hobbiesValue !== null) {
      updateData.hobbies = hobbiesValue
    }
    if (Object.keys(updateData).length > 0) {
      await db.profile.update({
        where: { id: profile.id },
        data: updateData,
      })
    }

    // Add new experiences (don't delete existing)
    if (experienceEntries.length > 0) {
      const existingCount = await db.experience.count({ where: { profileId: profile.id } })
      for (let i = 0; i < experienceEntries.length; i++) {
        const exp = experienceEntries[i]
        await db.experience.create({
          data: {
            profileId: profile.id,
            company: exp.company || "",
            position: exp.position || "",
            location: exp.location || null,
            startDate: exp.startDate || "",
            endDate: exp.endDate || null,
            current: exp.current === "true" || exp.current === true,
            description: exp.description || null,
            order: existingCount + i,
          },
        })
      }
    }

    // Add new education
    if (educationEntries.length > 0) {
      const existingCount = await db.education.count({ where: { profileId: profile.id } })
      for (let i = 0; i < educationEntries.length; i++) {
        const edu = educationEntries[i]
        await db.education.create({
          data: {
            profileId: profile.id,
            institution: edu.institution || "",
            degree: edu.degree || "",
            field: edu.field || null,
            location: edu.location || null,
            startDate: edu.startDate || "",
            endDate: edu.endDate || null,
            gpa: edu.gpa || null,
            description: edu.description || null,
            order: existingCount + i,
          },
        })
      }
    }

    // Add new skills
    if (skillEntries.length > 0) {
      const existingCount = await db.skill.count({ where: { profileId: profile.id } })
      for (let i = 0; i < skillEntries.length; i++) {
        const skill = skillEntries[i]
        // Check for duplicates
        const existing = await db.skill.findFirst({
          where: { profileId: profile.id, name: skill.name || "" },
        })
        if (!existing) {
          await db.skill.create({
            data: {
              profileId: profile.id,
              name: skill.name || "",
              category: skill.category || "technical",
              order: existingCount + i,
            },
          })
        }
      }
    }

    // Return updated profile
    const updatedProfile = await db.profile.findUnique({
      where: { id: profile.id },
      include: {
        experiences: { orderBy: { order: "asc" } },
        education: { orderBy: { order: "asc" } },
        skills: { orderBy: { order: "asc" } },
      },
    })

    return NextResponse.json({
      success: true,
      saved: confirmedFields.length,
      profile: updatedProfile,
    })
  } catch (error) {
    console.error("Profile confirm error:", error)
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 })
  }
}
