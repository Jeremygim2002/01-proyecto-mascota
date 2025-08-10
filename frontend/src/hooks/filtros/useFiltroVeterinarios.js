import { useMemo } from "react";
import { useFiltrado } from "@hooks/filtros/useFiltrado";

export function useFiltroVeterinarios(veterinarios, filtros, busqueda) {
  const filtradosPorBusqueda = useFiltrado(
    veterinarios,
    ["nombre", "dni", "especialidad"],
    busqueda
  );

  const final = useMemo(() => {
    return filtradosPorBusqueda.filter((v) => {
      const matchEstado =
        filtros.estado === ""
          ? true
          : filtros.estado === "activo"
          ? v.estado === true || v.estado === 1 || v.estado === "1"
          : v.estado === false || v.estado === 0 || v.estado === "0";

      const matchEspecialidad =
        filtros.especialidad === "" || v.especialidad === filtros.especialidad;

      return matchEstado && matchEspecialidad;
    });
  }, [filtradosPorBusqueda, filtros]);

  return final;
}
