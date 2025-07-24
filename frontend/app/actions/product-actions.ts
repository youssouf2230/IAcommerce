'use server';

import { Product } from "@/types";

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