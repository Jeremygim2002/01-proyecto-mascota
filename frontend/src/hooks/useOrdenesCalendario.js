import { useState, useEffect } from "react";
import { obtenerOrdenes } from "@services/ordenService";

const useOrdenesCalendario = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const colores = [
        "#38BDF8",
        "#818CF8",
        "#A78BFA",
        "#67E8F9",
        "#6EE7B7",
        "#FCD34D",
        "#93C5FD",
      ];

      try {
        const data = await obtenerOrdenes();

        const mapped = data
          .map((o, i) => {
            const cleanTime = (str) => {
              if (!str) return "00:00:00";
              const match = str.match(/\d{2}:\d{2}(:\d{2})?/);
              return match ? match[0].padEnd(8, ":00").slice(0, 8) : "00:00:00";
            };

            const fechaLimpia = o.fecha.slice(0, 10);
            const rawStart = `${fechaLimpia}T${cleanTime(o.hora_inicio)}`;
            const rawEnd = `${fechaLimpia}T${cleanTime(o.hora_fin)}`;

            const startValid = !isNaN(new Date(rawStart).getTime());
            const endValid = !isNaN(new Date(rawEnd).getTime());

            if (!startValid || !endValid) return null;

            return {
              id: o.id_orden,
              title: `${o.servicio} - ${o.nombre_mascota}`,
              start: rawStart,
              end: rawEnd,
              backgroundColor: colores[i % colores.length],
              borderColor: colores[i % colores.length],
              textColor: "#0F172A",
              extendedProps: o,
            };
          })
          .filter(Boolean);

        setEventos(mapped);
      } catch (err) {
        console.error("Error cargando órdenes:", err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  return { eventos, loading };
};

export default useOrdenesCalendario;
