
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function POST(req: Request) {
  try {
    const { userId, type, points } = await req.json();

    if (!userId || !type || typeof points !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    let updateField: any = {};
    updateField[type] = { increment: points };
    updateField.totalPoints = { increment: points };

    const updated = await prisma.leaderboard.upsert({
      where: { userId },
      update: updateField,
      create: {
        userId,
        [type]: points,
        totalPoints: points,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update leaderboard error:", err);
    return NextResponse.json({ error: "Failed to update leaderboard" }, { status: 500 });
  }
}



export async function GET() {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      include: { user: true },
      orderBy: { totalPoints: "desc" },
      take: 10, 
    });

    return NextResponse.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
