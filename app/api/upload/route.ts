// pages/api/upload.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const userId = formData.get("userId") as string | null;

    if (!file || !userId) {
      return NextResponse.json(
        { error: "File and userId are required" },
        { status: 400 }
      );
    }

    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Organize in profile/{userId}/{timestamp}-{filename}
    const fileName = `profile/${userId}/${Date.now()}-${file.name}`;

    const blob = await put(fileName, file, {
      access: "public",
    });

    // Save URL in DB
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { imageUrl: blob.url },
    });

    console.log("Updated user imageUrl:", updatedUser.imageUrl);

    return NextResponse.json({ url: blob.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}