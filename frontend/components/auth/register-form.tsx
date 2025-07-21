'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";  // <-- Correct import

export default function DataRegister() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataForm = new FormData(event.currentTarget);

    const username = dataForm.get("username") as string;
    const email = dataForm.get("email") as string;
    const password = dataForm.get("password") as string;
    const confirmPassword = dataForm.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords must be identical.");
      return;  // Arrête la fonction si mot de passe pas identique
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),  // Envoi du corps JSON
      });

      if (!response.ok) {  // Correction de la condition
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error occurred.");
      }

      alert("Account was created successfully");
      router.push("/login");  // Redirection après succès

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

  return <RegisterForm onSubmit={handleSubmit} />;
}

export function RegisterForm({
                               className,
                               ...props
                             }: React.ComponentProps<"form">) {
  return (
      <form className={cn("flex flex-col gap-6", className)} {...props}>
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
            <Input id="username" name="username" type="text" placeholder="johndoe123" required />
          </div>

          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="********" required />
          </div>

          {/* Confirm Password */}
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                required
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
          </div>

          <Button variant="outline" className="w-full" type="button">
            <Facebook className="mr-2 h-4 w-4" />
            Continue with Facebook
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
