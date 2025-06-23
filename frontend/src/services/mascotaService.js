const API_URL = import.meta.env.VITE_API_URL + "/api/mascotas";

export async function actualizarEstadoMascota(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });
  if (!res.ok) throw new Error("Error al actualizar estado");
  return res.json();
}

export async function obtenerTodasLasMascotas() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Error al obtener mascotas");
  return res.json();
}

export async function obtenerMascotaPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener mascota por ID");
  return res.json();
}


export async function crearMascota(data) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear mascota");
  }

  return res.json();
}

export async function actualizarMascota(mascota) {
  const res = await fetch(`${API_URL}/${mascota.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mascota)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar mascota");
  }
  return res.json();
}

export async function eliminarMascota(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/mascotas/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al eliminar mascota");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Error al eliminar mascota");
  }
}


export async function obtenerMascotasActivasPorDni(dni) {
  const res = await fetch(`${API_URL}/usuario/${dni}`);
  if (!res.ok) throw new Error("Error al obtener mascotas activas por DNI");
  return res.json(); // { usuario, mascotas }
}



export async function obtenerTotalMascotasActivas() {
  const res = await fetch(`${API_URL}/total/activas`);
  if (!res.ok) throw new Error("No se pudo obtener el total de mascotas activas");

  const data = await res.json();
  return data.total;
}

