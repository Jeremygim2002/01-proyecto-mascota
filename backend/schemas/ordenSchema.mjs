import { z } from 'zod';

const ordenSchema = z.object({
  id_mascota: z.string().uuid('Selecciona una mascota válida'),
  id_veterinario: z.string().uuid('Selecciona un veterinario válido'),
  id_asistente: z.string().uuid('Selecciona un asistente válido'),
  servicios: z.array(z.string().uuid('Servicio inválido')).min(1, 'Selecciona al menos un servicio'),
  hora_inicio: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido'),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido').optional(),
  estado: z.boolean().optional()
});

export function validateOrden(input) {
  return ordenSchema.safeParse(input);
}

export function validatePartialOrden(input) {
  return ordenSchema.partial().safeParse(input);
}
