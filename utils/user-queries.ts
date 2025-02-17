// import "server-only";

import prisma from "@/lib/prisma.db";

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
        console.log({message: "No user was found."})
    }
    return user;
}