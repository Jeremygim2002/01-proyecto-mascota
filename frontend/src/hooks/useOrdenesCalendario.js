import { useState, useEffect } from "react";
import { obtenerOrdenes } from "@services/ordenService";

const useOrdenesCalendario = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setEventos([
            {
                id: 'demo-1',
                title: 'Orden demo',
                start: '2025-06-24T10:00:00',
                end: '2025-06-24T11:00:00',
            },
        ]);
        setLoading(false);
    }, []);

    useEffect(() => {
        const cargar = async () => {
            try {


                const data = await obtenerOrdenes();
                console.log("Ordenes obtenidas:", data);

                const mapped = data.map((o, i) => {
                    
const cleanTime = (str) => str?.trim().replace(/[^0-9:]/g, '').padEnd(8, ':00').slice(0, 8);

const rawStart = `${o.fecha}T${cleanTime(o.hora_inicio)}`;
const rawEnd = `${o.fecha}T${cleanTime(o.hora_fin)}`;


                    const startValid = !isNaN(new Date(rawStart).getTime());
                    const endValid = !isNaN(new Date(rawEnd).getTime());

                    if (!startValid || !endValid) {
                        console.warn(`⚠️ Evento inválido index ${i}:`, { rawStart, rawEnd });
                        return null;
                    }

                    return {
                        id: o.id_orden,
                        title: `${o.servicio} - ${o.nombre_mascota}`,
                        start: rawStart,
                        end: rawEnd,
                        extendedProps: o,
                    };
                }).filter(Boolean);

                console.log("Eventos mapeados:", mapped);
                setEventos(mapped);
                mapped.forEach(ev => {
                    console.log(`🧪 ${ev.id}:`, ev.start, new Date(ev.start), "Valid?", !isNaN(new Date(ev.start)));
                });

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
