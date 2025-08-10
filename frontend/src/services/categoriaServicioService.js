
const API_URL = import.meta.env.VITE_API_URL + "/api/categorias-servicio";

export async function obtenerCategorias() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}
