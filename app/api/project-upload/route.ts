// app/api/project-upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function GET() {
  try {
    const projects = await prisma.projectShow.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response to include counts
    const formattedProjects = projects.map((project) => ({
      ...project,
      likesCount: project.likes.length,
      commentsCount: project.comments.length,
    }));

    return NextResponse.json(formattedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Handle FormData
    const formData = await request.formData();
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;
    const imageFiles = formData.getAll("images") as File[];

    if (!content || !userId) {
      return NextResponse.json(
        { error: "Content and userId are required" },
        { status: 400 }
      );
    }

    // Upload images to Vercel Blob
    const imageUrls: string[] = [];
    for (const imageFile of imageFiles) {
      if (imageFile.size > 0) {
        const blob = await put(
          `projects/${userId}/${Date.now()}-${imageFile.name}`,
          imageFile,
          { access: "public" }
        );
        imageUrls.push(blob.url);
      }
    }

    // Create project in database
    const project = await prisma.projectShow.create({
      data: {
        content,
        images: imageUrls,
        user: {
          connect: { id: parseInt(userId) },
        },
      },
      include: {
        user: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        likes: true,
      },
    });

    // Format the response
    const formattedProject = {
      ...project,
      likesCount: project.likes.length,
      commentsCount: project.comments.length,
    };

    return NextResponse.json(formattedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}