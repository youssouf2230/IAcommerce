/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { z } from "zod";
import { Product } from "@/types";
import { UTApi } from "uploadthing/server";
import { redirect } from "next/navigation";
import { ProductFormState } from "@/app/(admin)/dashboard/products/add/form-add";
import { API_BASE_URL } from "@/lib/utils";
import { error } from "console";

// 1. Define the new response type from your API
export interface PaginatedProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number; // current page number (0-indexed)
  size: number;
}

export async function getProducts(
  page: number,
  size: number,
  search = '',
  sort = ''
): Promise<PaginatedProductsResponse> {
  const url = new URL(`${API_BASE_URL}/api/products/all-products`);
  url.searchParams.append('page', String(page));
  url.searchParams.append('size', String(size));
  if (search) url.searchParams.append('search', search);
  if (sort) url.searchParams.append('sort', sort);

  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getProducts fetch error:", error);
    return { content: [], totalPages: 0, totalElements: 0, number: 0, size };
  }
}

export async function getSingleProduct(id: number): Promise<Product | { message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);

  if (!res.ok) {
    return { message: `Product not found: ${res.status}` };
  }

  return res.json();
}



// description: z.string().min(1, "Description is required"),
const ProductFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  purchasePrice: z.coerce.number().min(1, "Purchase price must be greater than 0"),
  sellPrice: z.coerce.number().min(1, "Sell price must be greater than 0"),
  oldPrice: z.coerce.number().optional(),
  stockQuantity: z.coerce.number().int().min(1, "Stock quantity must be greater than 0"),
  colors: z.array(z.string()).optional(),
  imageUrls: z.array(z.string()).min(1, "At least one image is required."),
  category: z.object({
    id: z.coerce.number().int().positive("Category is required")
  }),
});




export async function createProduct(prevState: any, formData: FormData): Promise<ProductFormState> {
  const utapi = new UTApi();

  try {
    const files = formData.getAll('imageUrls') as File[];
    const rawData = Object.fromEntries(formData.entries());

    const transformedData = {
      ...rawData,
      category: { id: rawData.categoryId },
    };

    const validatedFields = ProductFormSchema.omit({ imageUrls: true }).safeParse(transformedData);
    

    if (!validatedFields.success) {
      return {
        success: false,
        errors: z.treeifyError(validatedFields.error),
      };
    }

    if (files.length === 0 || files.some(f => f.size === 0)) {
      return {
        success: false,
        errors: { imageUrls: ["At least one product image is required."] },
      };
    }

    const uploadResponse = await utapi.uploadFiles(files);
    const uploadedImageUrls: string[] = [];


    for (const fileResult of uploadResponse) {
      if (fileResult.error) {
        console.error("UploadThing Error:", fileResult.error);


        throw new Error(`Failed to upload image: ${fileResult.error}`);
      }
      uploadedImageUrls.push(fileResult.data.ufsUrl);
    }

    const productDataForDbUnsafe = {
      ...validatedFields.data,
      imageUrls: uploadedImageUrls,
    };
     console.log(JSON.stringify(productDataForDbUnsafe))
     

    const res = await fetch(`${API_BASE_URL}/api/dashboard/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      
      body: JSON.stringify(productDataForDbUnsafe),
    });
    if(!res.ok){
      return {
        success:false,
        errors:{
          error:["An unexpected error occurred"]
        }
      }
    }
   
  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    return {
      success: false,
      errors: { error: [error.message || "An unexpected error occurred. Please try again."] },
    };
  }

  redirect('/dashboard/products');
}
