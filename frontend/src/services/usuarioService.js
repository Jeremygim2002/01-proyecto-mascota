const API_URL = import.meta.env.VITE_API_URL + "/api/usuarios";

// Buscar usuario por DNI
export async function buscarUsuarioPorDni(dni) {
    const res = await fetch(`${API_URL}/dni/${dni}`);
    if (!res.ok) return null;
    return res.json();
}

// Crear usuario
export async function crearUsuario(datos) {
    const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
}
