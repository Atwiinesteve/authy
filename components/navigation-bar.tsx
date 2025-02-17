"use client";

import { Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { auth } from "@/auth";

export default function NavigationBar() {
  // const userSession = await auth();
  return (
    <div>
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* {!userSession ? ( */}
            <>
              <div className="flex items-center space-x-2">
                <Link href="/" className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">AuthFlow</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
                <Link href="/login" className={buttonVariants({ size: "sm" })}>
                  Sign in
                </Link>
                <Link
                  className={buttonVariants({ size: "sm" })}
                  href={"/register"}
                >
                  Sign Up
                </Link>
              </div>
            </>
          {/* ) : ( */}
            {/* <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )} */}
        </div>
      </nav>
    </div>
  );
}
