const API_URL = import.meta.env.VITE_API_URL + "/api/veterinarios";

export async function obtenerVeterinarios() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Error al obtener veterinarios");
  return res.json();
}

export async function crearVeterinario(data) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear veterinario");
  }

  return res.json();
}

export async function actualizarVeterinario(veterinario) {
  const res = await fetch(`${API_URL}/${veterinario.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(veterinario)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar veterinario");
  }

  return res.json();
}

export async function eliminarVeterinario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar veterinario");
  }

  return res.json();
}

export async function actualizarEstadoVeterinario(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar estado");
  }

  return res.json();
}

export async function obtenerVeterinariosPorCategoria(idCategoria) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/veterinarios/categoria/${idCategoria}`);
  if (!res.ok) throw new Error("Error al obtener veterinarios por categoría");
  return res.json(); 
}

export async function obtenerVeterinarioPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener veterinario por ID");
  return res.json();
}
