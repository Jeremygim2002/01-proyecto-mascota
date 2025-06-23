import { useState, useEffect } from "react";
import { obtenerVeterinariosPorCategoria } from "@services/veterinarioService";
import { notificarError } from "@lib/notificaciones";

const useVeterinariosPorCategoria = (idCategoria) => {
  const [veterinarios, setVeterinarios] = useState([]);

  useEffect(() => {
    const cargarVeterinarios = async () => {
      if (!idCategoria) {
        setVeterinarios([]);
        return;
      }

      try {
        const data = await obtenerVeterinariosPorCategoria(idCategoria);
        setVeterinarios(data);
      } catch (error) {
        notificarError("Error al cargar veterinarios por categoría");
         console.error(error);
      }
    };

    cargarVeterinarios();
  }, [idCategoria]);

  return veterinarios;
};

export default useVeterinariosPorCategoria;
