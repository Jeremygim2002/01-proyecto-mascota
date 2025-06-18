import { z } from "zod";

export const usuarioSchema = z.object({
  nombre: z.string().trim().min(1, 'Por favor ingresa tu nombre'),
  apellido_paterno: z.string().trim().min(1, 'Por favor ingresa tu apellido paterno'),
  apellido_materno: z.string().trim().min(1, 'Por favor ingresa tu apellido materno'),
  correo: z.string().trim().email('Ingresa un correo válido'),
  numero_telefono: z.string().trim()
    .regex(/^9\d{8}$/, 'El número debe comenzar con 9 y tener 9 dígitos'),
  dni: z.string().trim()
    .regex(/^\d{8}$/, 'El DNI debe tener exactamente 8 dígitos'),
});
