const API_URL = import.meta.env.VITE_API_URL + "/api/servicios";

export async function obtenerServicios() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener servicios");
  return res.json();
}

export async function crearServicio(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear servicio");
  }

  return res.json();
}

export async function actualizarServicio(servicio) {
  const res = await fetch(`${API_URL}/${servicio.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servicio),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar servicio");
  }

  return res.json();
}

export async function eliminarServicio(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar servicio");
  }

  return res.json();
}

export async function actualizarEstadoServicio(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar estado del servicio");
  }

  return res.json();
}
