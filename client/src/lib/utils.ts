import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Resolve a /public file against the deploy base (works under any base path). */
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;
