import prisma from "@/lib/prisma";

export async function GET() {
  const commits = await prisma.leaderboard.findMany({
    select: { userId: true, commits: true, updatedAt: true }
  });

  
  const monthly = commits.map(c => ({
    month: c.updatedAt.toLocaleString("default", { month: "short" }),
    activity: c.commits
  }));

  return Response.json(monthly);
}
