import { useMemo } from "react";
import { useFiltrado } from "@hooks/filtros/useFiltrado";

export default function useFiltroMascotasUsuarios(datos, busqueda, filtros) {
  const filtradosBusqueda = useFiltrado(
    datos,
    ["nombre_mascota", "raza", "nombre_usuario", "dni", "tipo_mascota"],
    busqueda
  );

  const filtrados = useMemo(() => {
    return filtradosBusqueda.filter((u) => {
      const matchTipo =
        filtros.tipo === "" || u.tipo_mascota === filtros.tipo;

      const matchEstado =
        filtros.estado === ""
          ? true
          : filtros.estado === "activo"
          ? u.estado === true || u.estado === 1 || u.estado === "1"
          : u.estado === false || u.estado === 0 || u.estado === "0";

      return matchTipo && matchEstado;
    });
  }, [filtradosBusqueda, filtros]);

  return filtrados;
}
