import { z } from 'zod';

export const asistenteSchema = z.object({
  nombre: z.string().trim().min(1, 'Por favor ingresa tu nombre'),
  apellido_paterno: z.string().trim().min(1, 'Por favor ingresa tu apellido paterno'),
  apellido_materno: z.string().trim().min(1, 'Por favor ingresa tu apellido materno'),
  correo: z.string().trim().email('Ingresa un correo válido'),
  numero_telefono: z.string().trim()
    .regex(/^9\d{8}$/, 'El número debe empezar con 9 y tener 9 dígitos'),
  dni: z.string().trim().length(8, 'El DNI debe tener exactamente 8 dígitos'),
  password: z.string().trim().min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

const loginSchema = z.object({
  correo: z.string().trim().email('Correo electrónico no válido'),
  password: z.string().trim().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export function validateAsistente(input) {
  return asistenteSchema.safeParse(input);
}

export function validateLogin(input) {
  return loginSchema.safeParse(input);
}
