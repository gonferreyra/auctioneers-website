import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Debe ingresar un email valido'),
  password: z
    .string()
    .min(6, 'La contraseña debe contener como minimo 6 caracteres')
    .max(255),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

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
  // this fields are deleted for createCaseSchema but kept just in case. They are not needed for creation
  // aps: z.date().optional(),
  // apsExpiresAt: z.date().optional(),
  accountDgr: z.string().optional(),
  nomenclature: z.string().optional(),
});

export const appraisalCaseSchema = z.object({
  itemToAppraise: z.string().optional(),
  description: z.string().optional(),
});

export const createCaseSchema = baseCaseSchema.extend({
  internNumber: z.string().optional(),
  specificData: z.union([
    vehicleCaseSchema,
    propertyCaseSchema,
    appraisalCaseSchema,
  ]),
});

export type TCreateCaseSchema = z.infer<typeof createCaseSchema>;
