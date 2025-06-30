import { useMemo } from "react";
import { useFiltrado } from "@hooks/filtros/useFiltrado";

export default function useFiltroServicios(servicios, busqueda, filtros) {

  const filtradosBusqueda = useFiltrado(
    servicios,
    ["nombre", "categoria", "descripcion"],
    busqueda
  );

  const final = useMemo(() => {
    return filtradosBusqueda.filter((s) => {
      const matchCategoria =
        filtros.categoria === "" || s.categoria === filtros.categoria;

      const matchEstado =
        filtros.estado === ""
          ? true
          : filtros.estado === "disponible"
          ? s.estado === true || s.estado === 1 || s.estado === "1"
          : s.estado === false || s.estado === 0 || s.estado === "0";

      return matchCategoria  && matchEstado;
    });
  }, [filtradosBusqueda, filtros]);

  return final;
}
