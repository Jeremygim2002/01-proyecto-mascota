import { z } from 'zod';

export const veterinarioSchema = z.object({
  nombre: z.string().trim().min(1, 'Por favor ingresa el nombre'),
  apellido_paterno: z.string().trim().min(1, 'Por favor ingresa el apellido paterno'),
  apellido_materno: z.string().trim().min(1, 'Por favor ingresa el apellido materno'),
  correo: z.string().trim().email('Ingresa un correo válido'),
  numero_telefono: z.string()
    .regex(/^9\d{8}$/, 'El número debe empezar con 9 y tener 9 dígitos'),
  dni: z.string().regex(/^\d{8}$/, 'El DNI debe tener exactamente 8 dígitos'),
  estado: z.boolean().optional(),
  id_especialidad: z.number({
    required_error: 'Seleccione una especialidad',
    invalid_type_error: 'Seleccione una especialidad válida',
  }),
});

export function validateVeterinario(input) {
  return veterinarioSchema.safeParse(input);
}

export function validatePartialVeterinario(input) {
  return veterinarioSchema.partial().safeParse(input);
}