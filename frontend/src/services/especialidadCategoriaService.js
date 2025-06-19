const API_URL = import.meta.env.VITE_API_URL + "/api/especialidad-categorias";

export async function obtenerEspecialidadesCategorias() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener especialidades-categoría");
  return res.json();
}
