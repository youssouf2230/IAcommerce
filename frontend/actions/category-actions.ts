"use server"

import { API_BASE_URL } from '@/lib/utils';

import axios from "axios"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"
import z from "zod"


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

        const result = await axios.post(`${API_BASE_URL}/api/dashboard/categories`, {
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

export async function updateCategory(prevState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
    try {
        const data = Object.fromEntries(formData.entries());

        const validated = categorySHema.safeParse(data);
        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.flatten().fieldErrors,
            };
        }

        const id = formData.get("id");
        if (!id) {
            return {
                success: false,
                errors: {
                    name: ["Invalid category ID."],
                },
            };
        }

        let imageUrl = null;

        const file = formData.get("image") as File | null;
        if (file && file.size > 0) {
            const uploadResponse = await utapi.uploadFiles(file);
            if (uploadResponse.error) {
                return {
                    success: false,
                    errors: {
                        image: ["Image upload failed"],
                    },
                };
            }

            imageUrl = uploadResponse.data.ufsUrl;
        }

        await axios.put(`${API_BASE_URL}/api/dashboard/categories/${id}`, {
            name: validated.data.name,
            ...(imageUrl && { urlImage: imageUrl }),
        });

        revalidatePath("/dashboard/categories");

        return {
            success: true,
            errors: {},
        };
    } catch (e) {
      
        return {
            success: false,
            errors: {
                name: ["Something went wrong, please try again."],
            },
        };
    }
}


export async function deleteCategory(id: number) {
    try {

        await axios.delete(`${API_BASE_URL}/api/dashboard/categories/${id}`);

        revalidatePath("/dashboard/categories")
    }
    catch (e) {
        return {
            message: "something went wrong please try again"
        }
    }



}
