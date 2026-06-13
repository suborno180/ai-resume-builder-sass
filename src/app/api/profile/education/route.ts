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
    const { institution, degree, field, location, startDate, endDate, gpa, description, order } = body

    if (!institution || !degree || !startDate) {
      return NextResponse.json(
        { error: "Institution, degree, and start date are required" },
        { status: 400 }
      )
    }

    const education = await db.education.create({
      data: {
        profileId: profile.id,
        institution,
        degree,
        field: field || null,
        location: location || null,
        startDate,
        endDate: endDate || null,
        gpa: gpa || null,
        description: description || null,
        order: order ?? 0,
      },
    })

    return NextResponse.json({ education }, { status: 201 })
  } catch (error) {
    console.error("Education POST error:", error)
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
    const { id, institution, degree, field, location, startDate, endDate, gpa, description, order } = body

    if (!id) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.education.findUnique({
      where: { id },
      include: { profile: true },
    })

    if (!existing || existing.profile.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const education = await db.education.update({
      where: { id },
      data: {
        ...(institution !== undefined && { institution }),
        ...(degree !== undefined && { degree }),
        ...(field !== undefined && { field }),
        ...(location !== undefined && { location }),
        ...(startDate !== undefined && { startDate }),
        ...(endDate !== undefined && { endDate }),
        ...(gpa !== undefined && { gpa }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json({ education })
  } catch (error) {
    console.error("Education PUT error:", error)
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
        { error: "Education ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.education.findUnique({
      where: { id },
      include: { profile: true },
    })

    if (!existing || existing.profile.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await db.education.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Education deleted" })
  } catch (error) {
    console.error("Education DELETE error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
