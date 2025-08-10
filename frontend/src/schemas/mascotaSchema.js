import { z } from 'zod';

export const mascotaSchema = z.object({
  nombre: z.string().trim().min(1, 'Ingresa el nombre de la mascota'),
  raza: z.string().trim().min(1, 'Ingresa la raza'),
  edad: z.number().int().nonnegative('La edad debe ser un número positivo'),
  sexo: z.enum(['M', 'F'], {
    errorMap: () => ({ message: 'El sexo debe ser M (macho) o F (hembra)' })
  }),
  estado: z.boolean().optional(),
  imagen: z.string().url('Ingresa una URL válida para la imagen').optional(),
  id_usuario: z.string().uuid('ID de usuario inválido'),
  id_tipo_mascota: z.number().int('ID de tipo de mascota inválido')
});

export function validateMascota(input) {
  return mascotaSchema.safeParse(input);
}

export function validatePartialMascota(input) {
  return mascotaSchema.partial().safeParse(input);
}