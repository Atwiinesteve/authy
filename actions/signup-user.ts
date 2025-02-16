"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { registerSchema } from "@/schemas/auth-schems";
import prisma from "@/lib/prisma.db";

export async function registerUserAction(
	values: z.infer<typeof registerSchema>,
) {
	const parsedValues = registerSchema.safeParse(values);

	if (!parsedValues.success) {
		return {
			success: false,
			message: "Error during parsing user data.",
			statusCode: "500",
		};
	}

	const { name, email, password } = parsedValues.data;

	try {

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) {
            console.log("email already taken")
            return
        }

		const salt = await bcrypt.genSalt(13);
		const hashedPassword = await bcrypt.hash(parsedValues.data.password, salt);

		const data = await prisma.user.create({
			data: {
				name: parsedValues.data.name,
				email: parsedValues.data.email,
				password: hashedPassword,
			},
		});

		return { success: true, data, statusCode: 201 };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Internal Server Error.",
			statusCode: "500",
		};
	}
}
