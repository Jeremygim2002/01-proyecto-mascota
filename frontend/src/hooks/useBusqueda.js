import { useState } from "react";

export function useBusqueda() {
  const [busqueda, setBusqueda] = useState("");

  const handleSearch = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  return { busqueda, handleSearch };
}
