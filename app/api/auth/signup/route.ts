import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Department } from "@/src/generated/prisma";

interface SignupData {
  name: string;
  email: string;
  password: string;
  Department: Department; 
  ProgrammingExperience: number; 
  Interest?: string[];
}

export async function POST(req: Request) {
  try {
    const body: SignupData = await req.json();
    console.log("Received signup data:", body);

    const {
      name,
      email,
      password,
      Department,
      ProgrammingExperience, // frontend field
      Interest,
    } = body;

    // Map frontend field to Prisma field
    const ProgramingExperience = ProgrammingExperience;

    // Validation
    if (!name || !email || !password || !Department || ProgramingExperience === undefined) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.student.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.student.create({
      data: {
        name,
        email,
        Deptartment: Department, 
        ProgramingExperience: Number(ProgramingExperience), 
        Interest: Interest || [],
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Something went wrong during signup." },
      { status: 500 }
    );
  }
}
