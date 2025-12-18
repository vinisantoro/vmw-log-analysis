import { z } from 'zod';

const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760', 10); // 10MB default
const ALLOWED_TYPES = (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || '.log,.txt').split(',');

export const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    )
    .refine(
      (file) => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return ALLOWED_TYPES.includes(extension);
      },
      `File type must be one of: ${ALLOWED_TYPES.join(', ')}`
    ),
});

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!ALLOWED_TYPES.includes(extension)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${ALLOWED_TYPES.join(', ')}`,
    };
  }

  return { valid: true };
}

export function sanitizeString(input: string): string {
  // Remove null bytes and control characters except newlines and tabs
  return input.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
}

