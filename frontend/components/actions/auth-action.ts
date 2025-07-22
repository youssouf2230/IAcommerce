/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { LoginAuthSchema, SignUpAuthSchema } from '../schema/shema';
import { cookies } from 'next/headers';

// Pa$$w0rd!
type RegisterState = {
    errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    data?: {
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }
    message?: string;
} | null;

type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];

    };

    data?: {
        email?: string;
        password?: string;
    }
    message?: string;
} | null;





export async function handelRegister(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const authData = Object.fromEntries(formData.entries());

    // 1. Validate the form data
    const validateDataAuth = SignUpAuthSchema.safeParse(authData);

    if (!validateDataAuth.success) {
        // Return structured validation errors
        return {
            errors: validateDataAuth.error.flatten().fieldErrors,
            data: authData,
        };
    }

    // 2. If validation is successful, try to register the user
    try {
        await axios.post('http://localhost:8080/auth/register', validateDataAuth.data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
    } catch (err: any) {
        // 3. Handle API errors gracefully
        if (axios.isAxiosError(err) && err.response) {
            // Return a general error message from the API response (e.g., "User already exists")
            return {
                message: err.response.data.message || "Registration failed. Please try again.",
            };
        }
        // Return a generic message for unexpected errors (e.g., network failure)
        console.log("error", err);
        return {
            message: "An unexpected error occurred. Please try again later.",
        };
    }

    // 4. On successful registration, redirect the user
    redirect('/login');
}




export async function handleLogin(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const authData = Object.fromEntries(formData.entries());
    const validatedFields = LoginAuthSchema.safeParse(authData);
    let toRedirect="/";
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }


    try {
        const response = await axios.post(
            "http://localhost:8080/auth/login",
            validatedFields.data, // Pass the validated data object directly
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = response.data;

        if (!data.token) {
            // Handle cases where the API responds successfully but without a token
           
            return { message: 'Login successful, but no token was provided.' };
        }


       
        const cookieStore = cookies();
        (await cookieStore).set('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        (await cookieStore).set('user', JSON.stringify(data.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        if(data.user.roles.includes("ADMIN")){
            toRedirect="/dashboard"
        }

    } catch (err: any) {
        // 4. Handle API errors gracefully
        if (axios.isAxiosError(err) && err.response) {
                 
            // Return a specific error message from the API response
            return { message: err.response.data.message || 'Invalid email or password.' };
        }
        // Return a generic message for unexpected or network errors
       
        return { message: 'An unexpected error occurred. Please try again.' };
    }

    // 5. Redirect to the dashboard on successful login
    // This must be called outside the try...catch block
    
    redirect(toRedirect);
    

}



export async function handleLogout() {
  const cookieStore = cookies();

  // Delete the cookies that store the session
  (await cookieStore).delete('token');
  (await cookieStore).delete('user');

 
  redirect('/');
}