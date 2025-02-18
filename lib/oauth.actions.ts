"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  try {
    await signIn("google", {
      callbackUrl: "http://localhost:3000/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function signInWithGithub() {
  try {
    await signIn("github");
  } catch (error) {
    console.log(error);
  }
}
