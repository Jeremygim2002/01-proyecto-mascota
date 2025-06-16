const API_URL = import.meta.env.VITE_API_URL + "/api/especialidades";

export async function obtenerEspecialidades() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener especialidades");
  return res.json();
}
