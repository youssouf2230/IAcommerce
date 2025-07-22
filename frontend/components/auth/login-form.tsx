"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Facebook } from "lucide-react";
import Link from "next/link";

export default function DataLogin() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("==================================================================");
    console.log(password);
    console.log(email);
    console.log("==================================================================");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log("Response status:", response.status);
        console.log("Raw error text:", text);
        let errorMessage = "Unknown error occurred.";
        try {
          const json = JSON.parse(text);
          errorMessage = json.error || errorMessage;
        } catch (err) {
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      alert("Login successful");
      router.push("/");

    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Error: " + error.message);
        console.error(error);
      } else {
        alert("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return <LoginForm onSubmit={handleSubmit} />;
}

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentProps<"form">) {
  return (
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
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
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
          </div>
          <Button variant="outline" className="w-full">
            <Facebook className="mr-2 h-4 w-4" />
            Login with Facebook
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
