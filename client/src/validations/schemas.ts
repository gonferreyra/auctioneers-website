import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'La contraseña debe contener 6 caracteres')
    .max(255),
});
