import { z } from 'zod';

const asistenteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido_paterno: z.string().min(1, 'El apellido paterno es obligatorio'),
  apellido_materno: z.string().min(1, 'El apellido materno es obligatorio'),
  correo: z.string().email('Correo electrónico no válido'),
  numero_telefono: z.string().length(9, 'El número de teléfono debe tener 9 dígitos'),
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const loginSchema = z.object({
  correo: z.string().email('Correo electrónico no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export function validateAsistente(input) {
  return asistenteSchema.safeParse(input);
}

export function validateLogin(input) {
  return loginSchema.safeParse(input);
}
