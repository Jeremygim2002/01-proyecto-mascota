import { z } from 'zod';

export const servicioSchema = z.object({
  id_categoria: z.number().int('Categoría inválida'),
  nombre: z.string().trim().min(1, 'Ingresa el nombre del servicio'),
  descripcion: z.string().trim().min(1, 'Agrega una descripción'),
  duracion: z.number().int('La duración debe ser un número entero'),
  precio: z.number().nonnegative('El precio debe ser mayor o igual a 0'),
  estado: z.boolean().optional()
});

export function validateServicio(input) {
  return servicioSchema.safeParse(input);
}

export function validatePartialServicio(input) {
  return servicioSchema.partial().safeParse(input);
}
