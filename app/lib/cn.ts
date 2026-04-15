/**
 * cn — merge Tailwind class strings safely.
 *
 * Combines clsx (conditional class assembly) with tailwind-merge
 * (deduplication of conflicting Tailwind utilities, e.g. two `p-*` values).
 *
 * Import this instead of defining a local cn() in each component.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", className)
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
