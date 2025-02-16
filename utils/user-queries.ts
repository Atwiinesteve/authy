// import prisma from "@/lib/prisma.db";
// import { loginSchema } from "@/schemas/auth-schems";
// import * as z from "zod";

// export const findUserByEmail = async (
// 	email: string,
// ): Promise<z.infer<typeof loginSchema>> => {
// 	const { data } = loginSchema.safeParse();
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			email: data?.email,
// 		},
// 	});
// 	return user;
// };
