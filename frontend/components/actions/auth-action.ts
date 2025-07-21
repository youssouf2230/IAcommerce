/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { LoginAuthSchema, SignUpAuthSchema } from '../schema/shema';
import { redirect } from 'next/navigation';

export async function handelRegister(formData: FormData) {
    console.log( "cij",formData);

    if (!(formData instanceof FormData)) {
        return { message: "invalide form data" }
    }

    const authData = Object.fromEntries(formData.entries());

    const validateDataAuth = SignUpAuthSchema.safeParse(authData)

    if (!validateDataAuth.success) {
        return { message: "invalide form" }
    }

    try {

        // check user exists 
        const response = await axios.post(
            'http://localhost:8080/auth/register',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        const data = response.data;

        console.log("data", data);

        redirect('/login');
    } catch (err: any) {
        console.log(err);
    }
}



export async function handleLogin(formData: FormData) {
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



