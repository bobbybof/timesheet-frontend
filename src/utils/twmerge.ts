import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const tm = (...inputs: ClassValue[]) => twMerge(clsx(inputs))