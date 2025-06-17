import { z } from 'zod';

const usuarioSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
  apellido_paterno: z.string().trim().min(1, 'El apellido paterno es obligatorio'),
  apellido_materno: z.string().trim().min(1, 'El apellido materno es obligatorio'),
  correo: z.string().trim().email('Correo electrónico no válido'),
  numero_telefono: z.string().trim()
    .regex(/^9\d{8}$/, 'El número debe comenzar con 9 y tener 9 dígitos'),
  dni: z.string().trim()
    .regex(/^\d{8}$/, 'El DNI debe contener exactamente 8 números'),
});

export function validateUsuario(input) {
  return usuarioSchema.safeParse(input)
}

export function validatePartialUsuario(input) {
  return usuarioSchema.partial().safeParse(input)
}
