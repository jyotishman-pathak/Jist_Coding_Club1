// pages/api/profile.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        name: true,
        email: true,
        imageUrl: true,
        additionalInfo: {
          select: { githubUrl: true, linkedIn: true, instagram: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      githubUrl: user.additionalInfo?.githubUrl || "",
      linkedIn: user.additionalInfo?.linkedIn || "",
      instagram: user.additionalInfo?.instagram || "",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Fetch profile error:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}