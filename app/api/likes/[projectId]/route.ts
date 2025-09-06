import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const likes = await prisma.likes.count({
      where: { projectId },
    });

    return NextResponse.json({ projectId, likes });
  } catch (err) {
    console.error("Get likes error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
