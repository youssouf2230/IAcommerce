// lib/actions/commentActions.ts
'use server';


import { getUserSession } from '@/components/auth/auth-data';
import { API_BASE_URL } from '@/lib/utils';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';


export type FormState = {
    message: string;
    error?: string | null;
};


const CommentSchema = z.object({
    content: z.string().min(1, { message: "Comment cannot be empty." }),
    productId: z.coerce.number(),


    path: z.string(),
});

export async function addComment(prevState: FormState, formData: FormData): Promise<FormState> {
    // 1. Validate form data against our schema
    const session = await getUserSession();
    const userId = session?.user?.id ?? null;
    const authorName = session?.user?.username ?? null;

    const validatedFields = CommentSchema.safeParse(Object.fromEntries(formData.entries()));

    // If validation fails, return the error message
    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            error: validatedFields.error.flatten().fieldErrors.content?.[0] ?? "Invalid data provided.",
        };
    }


    const { content, productId, path } = validatedFields.data;
    const data = { content, authorName, userId, productId, };
    console.log("data", data)

    try {
        await axios.post(`${API_BASE_URL}/api/comments`, data, {
            withCredentials: true,
        });


        revalidatePath(path);


        return {
            message: 'Comment added successfully!',
            error: null,
        };
    } catch (err) {
        console.error("Error sending comment:", err);
       
        return {
            message: 'Failed to add comment.',
            error: 'An unexpected error occurred. Please try again.',
        };
    }
}