import { z } from 'zod';

const detalleOrdenSchema = z.object({
  id_orden: z.string().uuid('ID de orden inválido'),
  id_servicio: z.string().uuid('ID de servicio inválido')
});

export function validateDetalleOrden(input) {
  return detalleOrdenSchema.safeParse(input);
}

export function validatePartialDetalleOrden(input) {
  return detalleOrdenSchema.partial().safeParse(input);
}
