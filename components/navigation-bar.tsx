import { Shield } from 'lucide-react';
import React from 'react'
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

export default function NavigationBar() {
	return (
		<div>
			<nav className="border-b">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Link href="/" className="flex items-center gap-2">
							<Shield className="h-6 w-6 text-primary" />
							<span className="text-xl font-bold">AuthFlow</span>
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground">
							Documentation
						</Link>
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-foreground">
							Pricing
						</Link>
						<Link href="/login" className={buttonVariants({ size: "sm" })}>
							Sign in
						</Link>
						<Link className={buttonVariants({ size: "sm" })} href={"/register"}>
							Sign Up
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
