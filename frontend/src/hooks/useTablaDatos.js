import { useState, useMemo, useEffect } from "react"

/**
 * Hook reutilizable para manejar datos de tablas con búsqueda y estado.
 * 
 * @param {Array} dataInicial - Lista original de datos.
 * @param {Array} camposBusqueda - Campos a incluir en la búsqueda (strings).
 * @param {string} claveId - Nombre del campo que actúa como ID único. Por defecto 'id'.
 */



export const useTablaDatos = (dataInicial, camposBusqueda = [], claveId = 'id', toggleApi) => {
  const [busqueda, setBusqueda] = useState("");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    setDatos(dataInicial);
  }, [dataInicial]);

  const handleSearch = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const toggleEstado = async (id, estadoActual) => {
    try {
      await toggleApi(id, !estadoActual);
      setDatos((prev) =>
        prev.map((item) =>
          item[claveId] === id ? { ...item, estado: !estadoActual } : item
        )
      );
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  const datosFiltrados = useMemo(() => {
    return datos.filter((item) =>
      camposBusqueda.some((campo) =>
        String(item[campo] ?? "").toLowerCase().includes(busqueda)
      )
    );
  }, [datos, busqueda, camposBusqueda]);

  return {
    busqueda,
    handleSearch,
    toggleEstado,
    datosFiltrados,
  };
};