// app/api/events/[id]/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; 

    const project = await prisma.events.findUnique({
      where: { id: Number(id) },
    });

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response("Failed to fetch project", { status: 500 });
  }
}
