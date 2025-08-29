// pages/api/update-profile.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, email, imageUrl, githubUrl, linkedIn, instagram } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

   
    const updateUserData: any = {};
    if (name) updateUserData.name = name;
    if (email) updateUserData.email = email;
    if (imageUrl) updateUserData.imageUrl = imageUrl;

    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: updateUserData,
    });


    if (githubUrl || linkedIn || instagram) {
      await prisma.additionalInfo.upsert({
        where: { userId: Number(userId) },
        update: {
          githubUrl: githubUrl || undefined,
          linkedIn: linkedIn || undefined,
          instagram: instagram || undefined,
        },
        create: {
          userId: Number(userId),
          githubUrl: githubUrl || "",
          linkedIn: linkedIn || "",
          instagram: instagram || "",
        },
      });
    }

    console.log("Updated user:", user);
    return NextResponse.json({ message: "Profile updated" });
  } catch (err) {
    console.error("Update profile error:", err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}