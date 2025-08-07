'use client';

import { useActionState } from "react";
import Link from "next/link";
import { Google } from "developer-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../shared/submit-button";
import { handelRegister } from "../../actions/auth-action";

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {

  const [state, formAction, pending] = useActionState(handelRegister, null);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      action={formAction}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information to create your account
        </p>
      </div>

      <div className="grid gap-4">
        {/* Username */}
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe123"
            defaultValue={state?.data?.username}
          />
          {/* Display validation errors from the server action state */}
          {state?.errors?.username && (
            <p className="text-red-500 text-sm">
              {state.errors.username[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            defaultValue={state?.data?.email}
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            defaultValue={state?.data?.password}
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            defaultValue={state?.data?.confirmPassword}
          />
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* Display general form error (e.g., from API failure) */}
        {state?.message && (
          <p className="text-red-500 text-sm text-center">{state.message}</p>
        )}

        {/* Pass the pending state to the submit button to handle loading UI */}
        <SubmitButton pending={pending} type="submit" className="w-full">
          Register
        </SubmitButton>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <Button variant="outline" className="w-full" type="button">
          <Google className="mr-2 h-4 w-4" />
         
          Continue with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}