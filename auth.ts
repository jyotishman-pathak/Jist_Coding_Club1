import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"; 
import prisma  from "@/lib/prisma";

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
        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        });
        if (!user) throw new Error("Invalid credentials.");

        const isValid = await compare(
          String(credentials.password),
          String(user.password)
        );

        if (!isValid) throw new Error("Invalid credentials.");

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
session: {
    strategy: "jwt", // or "database" depending on your setup
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log("Session callback - token:", token, "user:", user);
      if (token?.sub) {
        session.user = session.user || {};
        session.user.id = token.sub; // Ensure ID is included
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
      } else if (user) {
        session.user = session.user || {};
        session.user.id = user.id.toString();
        session.user.email = user.email;
        session.user.name = user.name;
      }
      console.log("Session callback result:", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log("JWT callback:", token);
      return token;
    },
  },
});