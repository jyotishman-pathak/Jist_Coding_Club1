import { prisma } from "@/lib/prisma";
import { Department } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface SignupData {
  name: string;
  email: string;
  password: string;
  Department: Department;
  ProgrammingExperience: number;
  Interest?: string[];
}

export async function POST(req: Request) {
  let body: SignupData | undefined;
  try {
    // Parse request body
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON:", error);
      return NextResponse.json(
        { error: "Invalid JSON format in request body." },
        { status: 400 }
      );
    }
    console.log("Received signup data:", JSON.stringify(body, null, 2));

    if (!body) {
      return NextResponse.json(
        { error: "Request body is missing." },
        { status: 400 }
      );
    }
    const { name, email, password, Department, ProgrammingExperience, Interest } = body;

    // Validate required fields
    if (!name || !email || !password || !Department || ProgrammingExperience === undefined) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Validate Department
    const validDepartments = Object.values(Department);
    if (!validDepartments.includes(Department)) {
      return NextResponse.json(
        { error: `Invalid department value. Must be one of: ${validDepartments.join(", ")}.` },
        { status: 400 }
      );
    }

    // Validate ProgrammingExperience
    if (isNaN(Number(ProgrammingExperience)) || Number(ProgrammingExperience) < 0) {
      return NextResponse.json(
        { error: "ProgrammingExperience must be a valid non-negative number." },
        { status: 400 }
      );
    }

    // Check for existing user
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
    const hashedPassword = await bcrypt.hash(password, 8); // Reduced salt rounds for performance

    // Create new user
    const newUser = await prisma.student.create({
      data: {
        name,
        email,
        Department,
        ProgrammingExperience: Number(ProgrammingExperience),
        Interest: Interest || [],
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      body,
    });
    return NextResponse.json(
      {
        error: "Something went wrong during signup.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}