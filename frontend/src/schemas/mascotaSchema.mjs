import { z } from 'zod';

export const mascotaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  raza: z.string().min(1, 'La raza es obligatoria'),
  edad: z.number().int().nonnegative('La edad debe ser positiva'),
  sexo: z.enum(['M', 'F'], {
    errorMap: () => ({ message: 'El sexo debe ser M o F' })
  }),
  estado: z.boolean().optional(),
  id_usuario: z.string().uuid('ID de usuario no válido')
});
