import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Add Comment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, projectId, content } = body;

    if (!userId || !projectId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        userId: Number(userId),
        projectId: projectId,
        content,
      },
      include: {
        user: {
          select: { id: true, name: true, imageUrl: true },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Get All Comments of a Project
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { projectId },
      include: {
        user: { select: { id: true, name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
