import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; 
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user by email
        const user = await prisma.student.findUnique({
          where: { email: String(credentials.email) },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        // Compare provided password with stored hash
        const isValid = await compare(String(credentials.password), String(user.password));

        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
