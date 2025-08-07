/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 



export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};


export { getOrCreateSessionId };






export function getStatusStyles(status: string): string {
  status = status.toLowerCase();

  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400";
    case "confirmed":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400";
    case "processing":
      return "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400";
    case "shipped":
      return "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400";
    case "delivered":
      return "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400";
    case "cancelled":
      return "bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400";
    case "rejected":
      return "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400";
    case "returned":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400";
    case "refunded":
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400";
    default:
      return "bg-gray-100 text-gray-700 text-opacity-60 dark:bg-gray-800/60 dark:text-gray-400";
  }
}

   export const formattedPrice = (price:number)=>{

    return new Intl.NumberFormat("fr-MA", {
                  style: "currency",
                  currency: "MAD",
              }).format(price)
   }
