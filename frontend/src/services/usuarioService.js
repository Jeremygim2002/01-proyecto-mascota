const API_URL = import.meta.env.VITE_API_URL + "/api/usuarios";

export async function buscarUsuarioPorDni(dni) {
    const res = await fetch(`${API_URL}/dni/${dni}`);
    if (!res.ok) return null;
    return res.json();
}

export async function crearUsuario(datos) {
    const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
}

export async function buscarUsuarioConMascotasPorDni(dni) {
    const res = await fetch(`${API_URL}/mascotas/${dni}`);
    if (!res.ok) return null;
    return res.json();
}

export async function obtenerUsuarios() {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
}

export async function obtenerUsuarioPorId(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener usuario por ID");
    return res.json();
}

export async function eliminarUsuario(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
}

export async function actualizarUsuario(usuario) {
    const res = await fetch(`${API_URL}/${usuario.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
}

