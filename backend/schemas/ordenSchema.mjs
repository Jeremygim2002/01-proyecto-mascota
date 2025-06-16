import { z } from 'zod';

const ordenSchema = z.object({
    id_mascota: z.string().uuid('ID de mascota inválido'),
    id_veterinario: z.string().uuid('ID de veterinario inválido'),
    id_asistente: z.string().uuid('ID de asistente inválido'),
    servicios: z.array(z.string().uuid('ID de servicio inválido')).min(1, 'Debe seleccionar al menos un servicio'),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida (YYYY-MM-DD)').optional(),
    hora: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Hora inválida (HH:MM o HH:MM:SS)').optional(),
    estado: z.boolean().optional()
});

export function validateOrden(input) {
    return ordenSchema.safeParse(input);
}

export function validatePartialOrden(input) {
    return ordenSchema.partial().safeParse(input);
}
