import { z } from 'zod';

const veterinarioSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido_paterno: z.string().min(1, 'El apellido paterno es obligatorio'),
  apellido_materno: z.string().min(1, 'El apellido materno es obligatorio'),
  correo: z.string().email('Correo electrónico no válido'),
  numero_telefono: z.string().length(9, 'El número de teléfono debe tener 9 dígitos'),
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  estado: z.union([z.boolean(), z.undefined()]),
  id_especialidad: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Seleccione una especialidad válida',
  }).transform(Number),
});

export function validateVeterinario(input) {
  return veterinarioSchema.safeParse(input);
}

export function validatePartialVeterinario(input) {
  return veterinarioSchema.partial().safeParse(input);
}