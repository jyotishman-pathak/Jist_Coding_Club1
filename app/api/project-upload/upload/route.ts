// pages/api/project-upload/upload/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; 
    const userId = formData.get("userId") as string | null;
    const content = formData.get("content") as string | null;

    if (!files.length || !userId || !content) {
      return NextResponse.json(
        { error: "Files, content and userId are required" },
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

    // Upload all files
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const fileName = `projects/${userId}/${Date.now()}-${file.name}`;
      const blob = await put(fileName, file, { access: "public" });
      uploadedUrls.push(blob.url);
    }

    // Save project with images
    const project = await prisma.projectShow.create({
      data: {
        content,
        images: uploadedUrls,
        user: {
          connect: { id: Number(userId) },
        },
      },
    });

    return NextResponse.json(
      { project },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Project upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
