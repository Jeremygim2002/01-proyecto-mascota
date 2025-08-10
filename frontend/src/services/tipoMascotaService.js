const API_URL = import.meta.env.VITE_API_URL + "/api/tipos-mascota";

export async function obtenerTiposMascota() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener tipos de mascota");
  return res.json();
}
