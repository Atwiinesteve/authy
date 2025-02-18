//  imports
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { getUserByEmail } from "./utils/user-queries";
import { loginSchema } from "./schemas/auth-schems";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./lib/prisma.db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/api/auth" },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // get user from database
          const user = await getUserByEmail(email);
          if (!user) return null;
          if (!user?.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
