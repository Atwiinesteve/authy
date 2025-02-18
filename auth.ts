//  imports
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./utils/user-queries";
import { loginSchema } from "./schemas/auth-schems";

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
	pages: { signIn: "/login" },
	providers: [
		credentials({
			 async authorize (credentials) {
				const parsedCredentials = loginSchema.safeParse(credentials);
				if(parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;

					// get user from database
					const user = await getUserByEmail(email);
					if (!user) return null;
					if (!user?.password) return null;

					const passwordsMatch = await bcrypt.compare(password, user.password);
					if(passwordsMatch) {
						const {password: _, ...userWithoutPassword} = user;
						return userWithoutPassword;
					}
				}
				return null;
			},
		}),
	],
});
