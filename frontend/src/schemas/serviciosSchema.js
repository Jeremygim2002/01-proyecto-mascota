import { z } from 'zod';

export const servicioSchema = z.object({
  id_categoria: z.number().int('ID de categoría no válido'),
  nombre: z.string().min(1, 'El nombre del servicio es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  duracion: z.number().int('La duración debe ser un número entero'),
  precio: z.number().nonnegative('El precio debe ser un número positivo'),
  estado: z.union([z.boolean(), z.undefined()]),
});

export function validateServicio(input) {
  return servicioSchema.safeParse(input);
}

export function validatePartialServicio(input) {
  return servicioSchema.partial().safeParse(input);
}
