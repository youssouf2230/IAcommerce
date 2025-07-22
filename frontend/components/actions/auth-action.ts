/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import axios from 'axios';
import { redirect } from 'next/navigation';
import { LoginAuthSchema, SignUpAuthSchema } from '../schema/shema';
import { cookies } from 'next/headers';


type RegisterState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
} | null;

type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
   
  };
  message?: string;
} | null;





export async function handelRegister(prevState: RegisterState,formData: FormData): Promise<RegisterState> {
    const authData = Object.fromEntries(formData.entries());

    // 1. Validate the form data
    const validateDataAuth = SignUpAuthSchema.safeParse(authData);

    if (!validateDataAuth.success) {
        // Return structured validation errors
        return {
            errors: validateDataAuth.error.flatten().fieldErrors,
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
        return {
            message: "An unexpected error occurred. Please try again later.",
        };
    }

    // 4. On successful registration, redirect the user
    redirect('/login');
}


export async function handleLogin( prevState:LoginState, formData: FormData) {
    if (!(formData instanceof FormData)) {
        return { message: "invalide form data" }
    }
    const authData = Object.fromEntries(formData.entries());
    const validateDataAuth = LoginAuthSchema.safeParse(authData)

    if (!validateDataAuth.success) {
        return { message: "invalide form" }
    }
    try {
        const response = await axios.post(
            'http://localhost:8080/auth/login',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        const data = response.data;
        if (!data.token) {
            return { success: false, error: 'No token received from server.' };
        }

        // Set cookies securely
        (await cookies()).set('token', data.token, {
            httpOnly: true, // Prevent client-side access to the token
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            path: '/',
        });

        // Avoid storing sensitive user data in cookies; store only necessary info
        (await
            // Avoid storing sensitive user data in cookies; store only necessary info
            cookies()).set('user', JSON.stringify({ id: data.user.id, email: data.user.email }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });

        return { success: true };
    } catch (err: any) {
        return {
            success: false,
            error: err.response?.data?.message || 'Invalid email or password.',
        };
    }
}



