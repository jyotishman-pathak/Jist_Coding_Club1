import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type Department =
  | "PEIE"
  | "ETC"
  | "MECH"
  | "CIVIL"
  | "MATHS"
  | "PHYSICS"
  | "CHEMISTRY"
  | "IT";

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
    // Parse request body
    let body: SignupData;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Invalid JSON:", error);
      return NextResponse.json(
        { error: "Invalid JSON format in request body." },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      Department,
      ProgrammingExperience,
      Interest,
    } = body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !Department ||
      ProgrammingExperience === undefined
    ) {
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
    const validDepartments: Department[] = [
      "PEIE",
      "ETC",
      "MECH",
      "CIVIL",
      "MATHS",
      "PHYSICS",
      "CHEMISTRY",
      "IT",
    ];
    if (!validDepartments.includes(Department)) {
      return NextResponse.json(
        {
          error: `Invalid department value. Must be one of: ${validDepartments.join(
            ", "
          )}.`,
        },
        { status: 400 }
      );
    }

    // Validate ProgrammingExperience
    if (
      isNaN(Number(ProgrammingExperience)) ||
      Number(ProgrammingExperience) < 0
    ) {
      return NextResponse.json(
        {
          error:
            "ProgrammingExperience must be a valid non-negative number.",
        },
        { status: 400 }
      );
    }

    // ✅ Check existing user
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbError: any) {
      console.error("🔥 Prisma Error Details:", {
        code: dbError.code,
        meta: dbError.meta,
        message: dbError.message,
        stack: dbError.stack,
      });
      return NextResponse.json(
        {
          error: "Database operation failed",
          details: dbError.message,
          prismaCode: dbError.code ?? "UNKNOWN",
        },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    let newUser;
    try {
      newUser = await prisma.user.create({
        data: {
          name,
          email,
          Department,
          ProgrammingExperience: Number(ProgrammingExperience),
          Interest: Interest || [],
          password: hashedPassword,
        },
      });
    } catch (dbError: any) {
      console.error("🔥 Prisma Error on Create:", {
        code: dbError.code,
        meta: dbError.meta,
        message: dbError.message,
        stack: dbError.stack,
      });
      return NextResponse.json(
        {
          error: "Database operation failed during user creation",
          details: dbError.message,
          prismaCode: dbError.code ?? "UNKNOWN",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
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
