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


export async function actualizarOrden({ id_orden, ...input }) {
  if (!id_orden) {
    throw new Error("ID de orden no proporcionado");
  }

  const res = await fetch(`${API_URL}/${id_orden}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("💥 Error completo:", error); // 👈 Añade esto
    throw new Error(
      typeof error === "string"
        ? error
        : JSON.stringify(error, null, 2)
    );
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

export async function actualizarEstadoOrden(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar estado de la orden");
  }

  return res.json();
}

export async function obtenerTotalOrdenesActivas() {
  const res = await fetch(`${API_URL}/total/activos`);
  if (!res.ok) throw new Error("No se pudo obtener el total de órdenes activas");

  const data = await res.json();
  return data.total;
}

export async function obtenerIngresosPorCategoria() {
  const res = await fetch(`${API_URL}/analisis/ingresos-categoria`);
  if (!res.ok) throw new Error("Error al obtener ingresos por categoría");
  return res.json();
}

export async function obtenerIngresosPorMes() {
  const res = await fetch(`${API_URL}/ingresos/mensuales`);
  if (!res.ok) throw new Error("Error al obtener ingresos por mes");
  return res.json();
}

export async function obtenerOrdenesPorTipoMascota() {
  const res = await fetch(`${API_URL}/analisis/ordenes-tipo-mascota`);
  if (!res.ok) throw new Error('Error al obtener órdenes por tipo de mascota');
  return res.json();
}

export async function obtenerHistorialOrdenesMascota(id_mascota) {
  const res = await fetch(`${API_URL}/mascota/${id_mascota}/historial`);
  if (!res.ok) throw new Error("Error al obtener historial de mascota");
  return res.json();
}
