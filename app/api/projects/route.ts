import { projectSchema } from "@/lib/validation";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input directly
    const result = projectSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ errors: result.error }), {
        status: 400,
      });
    }

    const validData = result.data;
    console.log("validated data", validData);

    const newProject = await prisma.projects.create({
      data: {
        projectTitle: validData.projectTitle,
        projectDescription: validData.projectDescription,
        githubUrl: validData.githubUrl ?? null,
        occuring: validData.occuring,
      },
    });

    return new Response(JSON.stringify(newProject), { status: 200 });
  } catch (error) {
    console.error("Error saving project:", error);
    return new Response("Failed to save project", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.projects.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response("Failed to fetch projects", { status: 500 });
  }
}
