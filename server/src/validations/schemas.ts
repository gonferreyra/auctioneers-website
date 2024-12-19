import z from 'zod';

// Auth
export const emailSchema = z.string().email().min(1).max(255);
export const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const verificationCodeSchema = z.string().min(1).max(36); //uuid have 36 characters long

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});

// Movements
export const movementSchema = z.object({
  case_id: z.number(),
  description: z.string(),
});

// Cases
export const getCasesPaginatedSchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  sortBy: z.string().optional().default('id'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const caseIdSchema = z.string();
