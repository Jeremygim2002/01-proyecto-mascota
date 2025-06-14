const API_URL = import.meta.env.VITE_API_URL + "/api/mascota-usuario";

export async function obtenerMascotasUsuarios() {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error("Error al obtener mascota-usuario");
    return res.json();
}

export async function eliminarMascota(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Error al eliminar mascota");
  return res.json();
}