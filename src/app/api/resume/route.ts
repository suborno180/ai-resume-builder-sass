import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const resumes = await db.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ resumes })
  } catch (error) {
    console.error("Resume GET error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, templateId, content } = body

    if (!title) {
      return NextResponse.json(
        { error: "Resume title is required" },
        { status: 400 }
      )
    }

    const resume = await db.resume.create({
      data: {
        userId: session.user.id,
        title,
        templateId: templateId || "minimal",
        content: content || "{}",
      },
    })

    return NextResponse.json({ resume }, { status: 201 })
  } catch (error) {
    console.error("Resume POST error:", error)
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
    const { id, title, templateId, content } = body

    if (!id) {
      return NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.resume.findUnique({
      where: { id },
    })

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const resume = await db.resume.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(templateId !== undefined && { templateId }),
        ...(content !== undefined && { content }),
      },
    })

    return NextResponse.json({ resume })
  } catch (error) {
    console.error("Resume PUT error:", error)
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
        { error: "Resume ID is required" },
        { status: 400 }
      )
    }

    // Verify ownership
    const existing = await db.resume.findUnique({
      where: { id },
    })

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await db.resume.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Resume deleted" })
  } catch (error) {
    console.error("Resume DELETE error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
