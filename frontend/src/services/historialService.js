
const API_URL = import.meta.env.VITE_API_URL + "/api/historial";

export async function obtenerMascotasUsuarios() {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error("Error al obtener historial de mascotas-usuarios");
    return res.json();
}
