import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Debe ingresar un email valido'),
  password: z
    .string()
    .min(6, 'La contraseña debe contener como minimo 6 caracteres')
    .max(255),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
