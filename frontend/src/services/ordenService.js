const API_URL = import.meta.env.VITE_API_URL + "/api/ordenes";

export async function obtenerOrdenes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
}

export async function obtenerOrdenPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener orden");
  }
  return res.json();
}

export async function crearOrden(data) {
  const mapped = {
    ...data,
    hora_inicio: data.hora || data.hora_inicio,
  };

  delete mapped.hora;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapped),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear orden");
  }

  return res.json();
}


export async function actualizarOrden(orden) {
  const res = await fetch(`${API_URL}/${orden.id_orden}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orden),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar orden");
  }

  return res.json();
}

export async function eliminarOrden(id_orden, id_asistente) {
  const res = await fetch(`${API_URL}/${id_orden}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_asistente }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar orden");
  }

  return res.json();
}
