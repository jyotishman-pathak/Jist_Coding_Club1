import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";


// OTP generator
function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

// Mail sender using Gmail App Password
async function OTPSender(toEmail: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pass.jistcodingclub@gmail.com", // your Gmail address
      pass: "xumw bbxg tcce qpac",           // your 16-character App Password
    },
  });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background:#f4f4f4; border-radius:8px; max-width:600px; margin:auto; border:1px solid #ddd;">
      <h2 style="color:#2c3e50; text-align:center;">JIST Coding Club</h2>
      <p>We noticed you requested a password reset for your account.</p>
      <p>Your OTP:</p>
      <div style="text-align:center; margin:20px 0;">
        <span style="font-size:28px; font-weight:bold; color:#e74c3c; letter-spacing:5px;">
          ${otp}
        </span>
      </div>
      <p>This OTP is valid for <b>5 minutes</b>. Please do not share it.</p>
    </div>
  `;

  await transporter.sendMail({
    from: '"JIST Coding Club" <jyotishmanpathak11@gmail.com>',
    to: toEmail,
    subject: "Reset Password OTP - JIST Coding Club",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    html: htmlBody,
  });
}

// ✅ App Router PUT handler
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Step 1: check user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User with this email does not exist" }, { status: 404 });
    }

    // Step 2: generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Step 3: save OTP in DB (remove old ones first)
    await prisma.passwordReset.deleteMany({ where: { userId: user.id } });
    await prisma.passwordReset.create({
      data: { userId: user.id, otp, expiresAt },
    });

    // Step 4: send OTP email
    await OTPSender(email, otp);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
