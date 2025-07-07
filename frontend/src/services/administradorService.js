const API_URL = import.meta.env.VITE_API_URL + "/api/administradores";

export async function obtenerAdministradores() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener administradores");
  return res.json();
}
