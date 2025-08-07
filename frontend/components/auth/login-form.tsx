"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { handleLogin } from "../../actions/auth-action";
import { SubmitButton } from "../shared/submit-button";
import { Google } from "developer-icons";


export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {



  const [state, formAction, pending] = useActionState(handleLogin, null);

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required defaultValue={state?.data?.email} />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">
              {state.errors.email[0]}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="*********"
            required
            defaultValue={state?.data?.password}

          />
        </div>
        {state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}
        <SubmitButton pending={pending} type="submit" className="w-full">
          Login
        </SubmitButton>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
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
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
