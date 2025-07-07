const API_URL = import.meta.env.VITE_API_URL + "/api/registro";

export async function obtenerNotificaciones() {
  const res = await fetch(`${API_URL}/recientes`);
  if (!res.ok) throw new Error("Error al obtener notificaciones");
  return res.json();
}
