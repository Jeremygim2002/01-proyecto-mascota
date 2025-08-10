import { useMemo } from "react";
import { useFiltrado } from "@hooks/filtros/useFiltrado";

export default function useFiltroOrdenes(ordenes, filtros, busqueda) {
  const ordenesBusqueda = useFiltrado(
    ordenes,
    ["usuario", "nombre_mascota", "veterinario", "servicio"],
    busqueda
  );

  const ordenesFinal = useMemo(() => {
    return ordenesBusqueda.filter((orden) => {
      const matchVeterinario =
        filtros.veterinario === "" ||
        orden.id_veterinario?.toString() === filtros.veterinario;

      const matchEstado =
        filtros.estado === ""
          ? true
          : filtros.estado === "no_cancelado"
          ? orden.estado === false || orden.estado === 0 || orden.estado === "0"
          : orden.estado === true || orden.estado === 1 || orden.estado === "1";

      return matchVeterinario && matchEstado;
    });
  }, [ordenesBusqueda, filtros]);

  return ordenesFinal;
}

