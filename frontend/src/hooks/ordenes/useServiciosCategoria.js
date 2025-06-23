
import { useState, useEffect } from "react";

import { obtenerServiciosPorCategoria } from "@services/servicioService";

const useServiciosCategoria = (idCategoria) => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            if (!idCategoria) return;
            const data = await obtenerServiciosPorCategoria(idCategoria);
            setServicios(data);
        };
        cargar();
    }, [idCategoria]);

    return servicios;
};


export default useServiciosCategoria;