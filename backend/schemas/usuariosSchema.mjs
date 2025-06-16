import { z } from 'zod';

const usuarioSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido_paterno: z.string().min(1, 'El apellido paterno es obligatorio'),
  apellido_materno: z.string().min(1, 'El apellido materno es obligatorio'),
  correo: z.string().email('Correo electrónico no válido'),
  numero_telefono: z.string().length(9, 'El número de teléfono debe tener 9 dígitos'),
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
});

export function validateUsuario(input) {
  return usuarioSchema.safeParse(input)
}

export function validatePartialUsuario(input) {
  return usuarioSchema.partial().safeParse(input)
}
