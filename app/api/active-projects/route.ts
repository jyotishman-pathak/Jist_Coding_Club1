import prisma from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.projects.findMany({
    where: { occuring: "ONGOING" },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return Response.json(projects);
}