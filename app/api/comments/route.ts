// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body instead of FormData
    const { userId, projectId, content } = await req.json();

    if (!userId || !projectId || !content) {
      return NextResponse.json(
        { error: "userId, projectId and content are required" },
        { status: 400 }
      );
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

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { projectId },
      include: {
        user: { select: { id: true, name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}