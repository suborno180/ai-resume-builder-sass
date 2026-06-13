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
    const { company, position, location, startDate, endDate, current, description, order } = body

    if (!company || !position || !startDate) {
      return NextResponse.json(
        { error: "Company, position, and start date are required" },
        { status: 400 }
      )
    }

    const experience = await db.experience.create({
      data: {
        profileId: profile.id,
        company,
        position,
        location: location || null,
        startDate,
        endDate: endDate || null,
        current: current || false,
        description: description || null,
        order: order ?? 0,
      },
    })

    return NextResponse.json({ experience }, { status: 201 })
  } catch (error) {
    console.error("Experience POST error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, company, position, location, startDate, endDate, current, description, order } = body

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.experience.findUnique({
      where: { id },
      include: { profile: true },
    })

    if (!existing || existing.profile.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const experience = await db.experience.update({
      where: { id },
      data: {
        ...(company !== undefined && { company }),
        ...(position !== undefined && { position }),
        ...(location !== undefined && { location }),
        ...(startDate !== undefined && { startDate }),
        ...(endDate !== undefined && { endDate }),
        ...(current !== undefined && { current }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json({ experience })
  } catch (error) {
    console.error("Experience PUT error:", error)
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
        { error: "Experience ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.experience.findUnique({
      where: { id },
      include: { profile: true },
    })

    if (!existing || existing.profile.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await db.experience.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Experience deleted" })
  } catch (error) {
    console.error("Experience DELETE error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
