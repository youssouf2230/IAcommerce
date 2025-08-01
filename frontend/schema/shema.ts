import z from "zod"

export const LoginAuthSchema = z.object({
  email: z.email(),
  password: z.string()
})

export const SignUpAuthSchema = z.object({
  
  username: z.string()
    .min(3, "Username must be at least 3 characters long"),

  email: z.email("Invalid email format"),

  password: z.string()
    .min(1, "Password is required")
   .regex(/^.{6,}$/, 'Password must be at least 6 characters long.'),


  confirmPassword: z.string()
    .min(1, " Confirm Password is required"),

})
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error will be attached to the confirmPassword field
  });
