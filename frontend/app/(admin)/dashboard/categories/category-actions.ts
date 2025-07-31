"use server"

import axios from "axios"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"
import z from "zod"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const categorySHema = z.object({
    name: z.string().min(3).max(50),
    image: z.file(),
})
export type CategoryFormState = {
    success: boolean;
    errors: {
        name?: string[] | undefined;
        image?: string[] | undefined;
    };
} | undefined | null;

const utapi = new UTApi();
export async function addCategory(prevState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {




    try {

        const data = Object.fromEntries(formData.entries());
        const validated = categorySHema.safeParse(data);
        console.log(validated)
        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }
        const uploadResponse = await utapi.uploadFiles(validated.data.image);
        if (uploadResponse.error) {
            return {
                success: false,
                errors: {
                    image: ["No image uploaded"],
                },
            };
        }
        console.log("uploadResponse", uploadResponse.data.ufsUrl)

        const result = await axios.post(`${API_URL}/dashboard/categories`, {
            name: validated.data.name,
            urlImage: uploadResponse.data.ufsUrl, 
        });

        console.log("res", result.data)

        revalidatePath("/dashboard/categories")
        return {
            success: true,
            errors: {},
        }
    }
    catch (e) {
        console.log(e)
    }

}


export async function updateCategory() {
    // TODO : update category
    return
}

export async function deleteCategory(id: number) {
    try {
        
        await axios.delete(`http://localhost:8080/api/dashboard/categories/${id}`);

        revalidatePath("/dashboard/categories")
    }
    catch (e) {
        return{
            message: "something went wrong please try again"
        }
    }


   
}
