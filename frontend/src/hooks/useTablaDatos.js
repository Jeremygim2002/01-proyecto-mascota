import { useState, useMemo } from "react";

export const useTablaDatos = (dataInicial, camposBusqueda = []) => {
  const [busqueda, setBusqueda] = useState("");
  const [datos, setDatos] = useState(dataInicial);

  const handleSearch = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const toggleEstado = (id) => {
    setDatos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, estado: !item.estado } : item
      )
    );
  };

  const datosFiltrados = useMemo(() => {
    return datos.filter((item) =>
      camposBusqueda.some((campo) =>
        item[campo].toLowerCase().includes(busqueda)
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
