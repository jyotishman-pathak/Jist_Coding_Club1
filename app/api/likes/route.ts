import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Toggle Like (if exists → remove, else → add)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, projectId } = body;

    if (!userId || !projectId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingLike = await prisma.likes.findFirst({
      where: { userId: Number(userId), projectId },
    });

    if (existingLike) {
      await prisma.likes.delete({ where: { id: existingLike.id } });
      return NextResponse.json({ message: "Like removed" });
    }

    const like = await prisma.likes.create({
      data: {
        userId: Number(userId),
        projectId,
      },
      include: {
        user: { select: { id: true, name: true, imageUrl: true } },
      },
    });

    return NextResponse.json(like);
  } catch (err) {
    console.error("Error toggling like:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Get All Likes of a Project
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ error: "projectId required" }, { status: 400 });
    }

    const likes = await prisma.likes.findMany({
      where: { projectId },
      include: {
        user: { select: { id: true, name: true, imageUrl: true } },
      },
    });

    return NextResponse.json(likes);
  } catch (err) {
    console.error("Error fetching likes:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
