import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Need this for my shadcn setup to work with the className prop in the components. It merges the class names and handles conflicts properly.
export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
