"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas/auth-schems";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { loginUserAction } from "@/actions/signin-user";

export default function LoginPage() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { formState } = form;

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		const response = await loginUserAction(values);

		if (response.success) {
			toast.success("Login successful.");
			redirect("/dashboard");
		} else {
			toast.error("Invalid Credentials. Please try again.");
			redirect("/login");
		}
	}

	return (
		<div className="flex-1 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-[400px] space-y-6">
				{/* Header */}
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome back
					</h1>
					<p className="text-sm text-muted-foreground">
						Sign in to your account to continue
					</p>
				</div>

				{/* Social Login */}
				<div className="flex items-center justify-center gap-3">
					<Button variant="outline" className="w-full">
						<FaGithub className="mr-2 h-9 w-9" />
					</Button>
					<Button variant="outline" className="w-full">
						<FcGoogle className="mr-2 h-4 w-4" />
					</Button>
				</div>

				{/* Divider */}
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				{/* Login Form */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="name@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between">
							<a
								href="#"
								className="text-sm font-medium text-primary hover:text-primary/90">
								Forgot password?
							</a>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={formState.isSubmitting}>
							{formState.isSubmitting ? (
								<>
									<Loader2 className="animate-spin" />
									Please wait..
								</>
							) : (
								`Login`
							)}
						</Button>
					</form>
				</Form>

				{/* Sign Up Link */}
				<div className="text-center text-sm">
					Don't have an account?{" "}
					<Link
						href="/register"
						className="underline text-primary hover:text-primary/90">
						Create one now.
					</Link>
				</div>
			</div>
		</div>
	);
}
