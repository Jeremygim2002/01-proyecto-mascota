import { z } from 'zod';

const usuarioSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre es obligatorio'
  }).min(1),
  apellido_paterno: z.string().min(1),
  apellido_materno: z.string().min(1),
  correo: z.string().email(),
  numero_telefono: z.string().length(9, 'Debe tener 9 dígitos'),
  dni: z.string().length(8, 'Debe tener 8 dígitos'),
});

export function validateUsuario (input) {
  return usuarioSchema.safeParse(input)
}

export function validatePartialUsuario (input) {
  return usuarioSchema.partial().safeParse(input) // .partial() permite que los campos sean opcionales
}
