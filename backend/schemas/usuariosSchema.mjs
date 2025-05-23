import { z } from 'zod';

export const usuarioSchema = z.object({
  nombre: z.string().min(1),
  apellido_paterno: z.string().min(1),
  apellido_materno: z.string().min(1),
  correo: z.string().email(),
  numero_telefono: z.string().length(9),
  dni: z.string().length(8),
});
