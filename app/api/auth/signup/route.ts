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
  department: Department;
  programmingExperience: number;
  interest?: string[];
}

export async function POST(req: Request) {
  try {
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
      department,
      programmingExperience,
      interest,
    } = body;

    // Required fields
    if (!name || !email || !password || !department || programmingExperience === undefined) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    // Department validation
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
    if (!validDepartments.includes(department)) {
      return NextResponse.json(
        { error: `Invalid department. Must be one of: ${validDepartments.join(", ")}.` },
        { status: 400 }
      );
    }

    // Experience validation
    if (isNaN(Number(programmingExperience)) || Number(programmingExperience) < 0) {
      return NextResponse.json(
        { error: "Programming experience must be a valid non-negative number." },
        { status: 400 }
      );
    }

    // Existing user check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        Department:department,
        ProgrammingExperience: Number(programmingExperience),
        Interest: interest || [],
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong during signup.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
