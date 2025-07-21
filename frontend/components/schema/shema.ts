import z from "zod"

export const LoginAuthSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

export const SignUpAuthSchema = z.object({
  
  username: z.string()
    .min(3, "Username must be at least 3 characters long"),

  email: z.email("Invalid email format"),

  password: z.string()
    .min(6, "password is required")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Please enter a stronger password.'),

  confirmPassword: z.string()
    .min(1, " required"),

})
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error will be attached to the confirmPassword field
  });
