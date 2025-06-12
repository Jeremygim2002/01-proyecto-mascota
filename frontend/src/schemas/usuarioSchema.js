import { z } from "zod";

export const usuarioSchema = z.object({
  nombre: z.string({ required_error: "El nombre es obligatorio" }).min(1, "El nombre es obligatorio"),
  apellido_paterno: z.string().min(1, "El apellido paterno es obligatorio"),
  apellido_materno: z.string().min(1, "El apellido materno es obligatorio"),
  correo: z.string().email("Correo inválido"),
  numero_telefono: z.string().length(9, "El número de celular debe tener 9 dígitos"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
});
