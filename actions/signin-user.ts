"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas/auth-schems";
import { signIn } from "@/auth";

export async function loginUserAction(values: z.infer<typeof loginSchema>) {
	try {
		await signIn("credentials", { values, redirect: false });
		return { success: true };
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Internal Server Error.",
			statusCode: "500",
		};
	}
}
