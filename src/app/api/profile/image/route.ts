import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { createId } from "@paralleldrive/cuid2";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "profiles");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function getExtension(contentType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
  };
  return map[contentType] || ".jpg";
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPG, PNG, GIF, WebP" },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size: 5MB" },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Get current profile to check for existing image
    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
    });

    // Delete old image if exists
    if (profile?.image) {
      const oldPath = path.join(process.cwd(), "public", profile.image);
      if (existsSync(oldPath)) {
        try {
          await unlink(oldPath);
        } catch {
          // Ignore deletion errors
        }
      }
    }

    // Generate unique filename
    const id = createId();
    const ext = getExtension(file.type);
    const filename = `${id}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // Update profile with image path
    const imageUrl = `/uploads/profiles/${filename}`;
    await db.profile.upsert({
      where: { userId: session.user.id },
      update: { image: imageUrl },
      create: {
        userId: session.user.id,
        image: imageUrl,
      },
    });

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile?.image) {
      return NextResponse.json(
        { error: "No image to delete" },
        { status: 400 }
      );
    }

    // Delete file from disk
    const filePath = path.join(process.cwd(), "public", profile.image);
    if (existsSync(filePath)) {
      try {
        await unlink(filePath);
      } catch {
        // Ignore deletion errors
      }
    }

    // Update profile to remove image
    await db.profile.update({
      where: { userId: session.user.id },
      data: { image: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Image delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
