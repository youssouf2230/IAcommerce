/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { z } from "zod";
import { Product } from "@/types";
import { cookies } from "next/headers";
import { UTApi, UTFile } from "uploadthing/server";
import { redirect } from "next/navigation";
import { number } from "zod/v3";

// 1. Define the new response type from your API
export interface PaginatedProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number; // This is the current page number (0-indexed)
  size: number;
}

export async function getProducts(
  page: number,
  size: number,
  search = '',
  sort = ''
): Promise<PaginatedProductsResponse> { // 2. Update the return type

  const apiBaseUrl = process.env.API_URL || "http://localhost:8080";

  const url = new URL(`${apiBaseUrl}/api/products/all-products`);
  url.searchParams.append('page', String(page));
  url.searchParams.append('size', String(size));
  if (search) url.searchParams.append('search', search);
  if (sort) url.searchParams.append('sort', sort);

  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store', // Keep this for dynamic search/sort
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("getProducts fetch error:", error);
    // Return a default empty state on error
    return { content: [], totalPages: 0, totalElements: 0, number: 0, size: size };
  }
}


export async function getSingleProduct(id: number): Promise<Product | { message: string }> {
  const res = await fetch(`http://localhost:8080/api/products/${id}`); // Replace with your API endpoint
  if (!res.ok) {

    return {
      message: "Product not found" + res.status,

    }
  }
  const product = res.json();

  return product;
}


export async function recentlyViewedProducts(ProductCards: Product) {

  const cookie = await cookies();
  const cookie_products = await cookie.get('recentlyViewedProducts')

  if (true) {
    // const products = JSON.parse(cookie_products.value);
    // products.push(ProductCards);
    await cookie.set('recentlyViewedProducts', JSON.stringify([ProductCards]))
  }

  return null;

}






 const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  purchasePrice: z.coerce.number().min(0, "Purchase price must be positive"),
  sellPrice: z.coerce.number().min(0, "Sell price must be positive"),
  oldPrice: z.coerce.number().optional(),
  stockQuantity: z.coerce.number().int().min(0, "Stock must be a whole number"),
  description: z.string().min(1, "Description is required"),
  colors: z.array(z.string()).optional(),
  imageUrls: z.array(z.string()).min(1, "At least one image is required."),
  category: z.object({
    id: z.coerce.number().int().positive("Category is required")
  }),
});
// Assuming you use Next.js
export async function createProduct(prevState: any, formData: FormData) {
  const utapi = new UTApi();
  

  try {
    // 1. Extract file and text data
    const files = formData.getAll('imageUrls') as File[];
    const rawData = Object.fromEntries(formData.entries());

    const transformedData = {
         ...rawData,
         category: { id: rawData.categoryId },
       };
    // 2. Validate text fields using the schema (omitting imageUrls for now)
    const validatedFields = productSchema.omit({ imageUrls: true }).safeParse(transformedData);


    if (!validatedFields.success) {
      console.log('Validation Errors:', validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
      };

    }
    // 3. Manually validate the files
    if (files.length === 0 || files.some(f => f.size === 0)) {
      return {
        success: false,
        error: { imageUrls: ["At least one product image is required."] },
      };
    }


    const uploadResponse = await utapi.uploadFiles(files);

    const uploadedImageUrls: string[] = [];

    for (const fileResult of uploadResponse) {

      if (fileResult.error) {
        console.error("UploadThing Error:", fileResult.error);
        throw new Error(`Failed to upload image: ${fileResult.error}`); // More specific error
      }
      uploadedImageUrls.push(fileResult.data.ufsUrl);
    }

    // 5. Prepare the complete data object for the database
    
    const productDataForDbUnsafe = {

      ...validatedFields.data,
      imageUrls: uploadedImageUrls,
      // colors: [],
      // numberOfView: 0,
      // rating: 0,
      // numberOfComments: 0,
      // numberOfLiked: 0,
      // numberOfDisliked: 0,
    };

    // console.log("Product created successfully!", productDataForDbUnsafe);
    const res = await fetch('http://localhost:8080/api/dashboard/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(productDataForDbUnsafe),
    })
    console.log(res)




  } catch (error: any) {
    console.error("❌ Error creating product:", error);
    // Provide more context about the error.
    return {
      success: false,
      error: {
        _form: [error.message || "An unexpected error occurred. Please try again."],
        uploadThingError: error.message, //Original message
      },
    };
  }
  redirect('/dashboard/products');
}