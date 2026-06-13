import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const body = await request.json()
    const { name, category, order } = body

    if (!name) {
      return NextResponse.json(
        { error: "Skill name is required" },
        { status: 400 }
      )
    }

    const skill = await db.skill.create({
      data: {
        profileId: profile.id,
        name,
        category: category || "technical",
        order: order ?? 0,
      },
    })

    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    console.error("Skill POST error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: "Skill ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.skill.findUnique({
      where: { id },
      include: { profile: true },
    })

    if (!existing || existing.profile.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await db.skill.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Skill deleted" })
  } catch (error) {
    console.error("Skill DELETE error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
