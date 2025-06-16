import { z } from 'zod';

const ordenSchema = z.object({
  id_mascota: z.string().uuid('ID de mascota inválido'),
  id_veterinario: z.string().uuid('ID de veterinario inválido'),
  id_asistente: z.string().uuid('ID de asistente inválido'),
  estado: z.boolean().optional()
});

export function validateOrden(input) {
  return ordenSchema.safeParse(input);
}

export function validatePartialOrden(input) {
  return ordenSchema.partial().safeParse(input);
}
