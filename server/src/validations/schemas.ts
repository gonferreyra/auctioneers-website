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
export const movementIdSchema = z.string();

export const newMovementSchema = z.object({
  caseId: z.number(),
  description: z.string(),
});

export const updateMovementSchema = newMovementSchema;

// Cases
export const getCasesPaginatedSchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  sortBy: z.string().optional().default('id'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

export const idSchema = z.number();

export const baseCaseSchema = z.object({
  status: z.enum(['active', 'paralyzed', 'closed']).optional(),
  record: z.string().min(5).max(8),
  plaintiff: z.string(),
  defendant: z.string(),
  type: z.string(),
  court: z.string(),
  lawOffice: z.string().optional(),
  debt: z.number().optional(),
  caseType: z.enum(['vehicle', 'property', 'appraisal']),
});

export const vehicleCaseSchema = z.object({
  licensePlate: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  chassisBrand: z.string().optional(),
  chassisNumber: z.string().optional(),
  engineBrand: z.string().optional(),
  engineNumber: z.string().optional(),
});

export const propertyCaseSchema = z.object({
  propertyRegistration: z.string().optional(),
  percentage: z.number().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  aps: z.date().optional(),
  apsExpiresAt: z.date().optional(),
  accountDgr: z.string().optional(),
  nomenclature: z.string().optional(),
});

export const appraisalCaseSchema = z.object({
  caseInternNumber: z.string().optional(),
  itemToAppraise: z.string().optional(),
  description: z.string().optional(),
});

export const createCaseSchema = z.object({
  internNumber: z.string().optional(),
  status: z.enum(['active', 'paralyzed', 'closed']).optional(),
  record: z.string().min(5).max(8),
  plaintiff: z.string(),
  defendant: z.string(),
  type: z.string(),
  court: z.string(),
  lawOffice: z.string().optional(),
  debt: z.number().optional(),
  caseType: z.enum(['vehicle', 'property', 'appraisal']),
  specificData: z.union([
    vehicleCaseSchema,
    propertyCaseSchema,
    appraisalCaseSchema,
  ]),
});

export const updateCaseSchema = createCaseSchema.partial();
