import moment from 'moment';
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

// property schema to create a case
export const propertyCaseSchema = z.object({
  propertyRegistration: z.string().optional(),
  percentage: z.number().min(10).max(100).optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  accountDgr: z.string().optional(),
  nomenclature: z.string().optional(),
});

// property schema to update a case
export const updatePropertySchema = propertyCaseSchema.extend({
  aps: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsedDate = moment(value, 'YYYY-MM-DD').format('DD-MM-YYYY');
      console.log('fecha procesada: ', parsedDate);
      return parsedDate;
    }
    return value;
  }, z.string().optional()),
  apsExpiresAt: z.date().optional(),
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

// create schema and make all fields optional
export const updateCaseSchema = baseCaseSchema.extend({
  specificData: z.union([
    vehicleCaseSchema,
    propertyCaseSchema,
    appraisalCaseSchema,
  ]),
});

// infer the type
export type TUpdateCaseSchema = z.infer<typeof updateCaseSchema>;

export const createMovementSchema = z.object({
  caseInternNumber: z.string(),
  description: z.string().min(6),
});

export type TCreateMovementSchema = z.infer<typeof createMovementSchema>;

export const updateMovementSchema = z.object({
  description: z.string().min(6).max(100),
});

export type TUpdateMovementSchema = z.infer<typeof updateMovementSchema>;
