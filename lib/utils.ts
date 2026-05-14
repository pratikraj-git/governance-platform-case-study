import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compose Tailwind classnames safely.
 * Wraps `clsx` for conditional logic and `tailwind-merge` to resolve
 * conflicting utilities (the latter wins, the former drops).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
