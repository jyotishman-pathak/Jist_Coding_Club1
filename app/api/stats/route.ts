import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    
    const projects = await prisma.projects.count();

    
    const eventsAttended = await prisma.events.count({
      where: { occuring: "PAST" },
    });

    
    const members = await prisma.user.count();


    const leaderboardSum = await prisma.leaderboard.aggregate({
      _sum: {
        hackathon: true,
        workshop: true,
        quiz: true,
        commits: true,
        totalPoints: true,
      },
    });

    return new Response(
      JSON.stringify({
        stats: {
          projects,
          eventsAttended,
          members,
          contributions: leaderboardSum._sum, 
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return new Response("Failed to fetch stats", { status: 500 });
  }
}
