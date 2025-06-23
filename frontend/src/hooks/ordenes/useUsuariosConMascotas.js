import { useState } from "react";
import {
    notificarError,
    notificarExito,
} from "@lib/notificaciones";

import { buscarUsuarioConMascotasPorDni } from "@services/usuarioService";

const useUsuarioConMascotas = () => {
    const [usuario, setUsuario] = useState(null);
    const [mascotas, setMascotas] = useState([]);

    const buscarPorDni = async (dni) => {
        try {
            const data = await buscarUsuarioConMascotasPorDni(dni);
            setUsuario(data.usuario);
            setMascotas(data.mascotas);
            notificarExito("Usuario encontrado");
        } catch {
            notificarError("No se encontró usuario con ese DNI");
        }
    };

    return { usuario, mascotas, buscarPorDni };
};

export default useUsuarioConMascotas;
