//  imports
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/auth-schems";
import prisma from "./lib/prisma.db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
	pages: { signIn: "/login" },
	providers: [
		Credentials({
            credentials: {
                email: {},
                password: {}
            },
			authorize: async (credentials) => {
				const parsedCredentials = loginSchema.safeParse(credentials);
				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;

					const user = await prisma.user.findUnique({
						where: {
							email: email,
						},
					});

					if (!user) return null;
					if (!user.password) return null;

					const passwordsMatch = await bcrypt.compare(user.password, password);

					if (passwordsMatch) {
						const { password: _, ...userWithoutPassword } = user;
						return userWithoutPassword;
					}
				}
				return null;
			},
		}),
	],
});
