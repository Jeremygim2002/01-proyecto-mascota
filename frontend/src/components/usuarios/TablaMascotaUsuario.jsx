// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import TablaBase from "@common/tablas/TablaBase";

import { useBusqueda } from "@hooks/useBusqueda";
import { useFiltrado } from "@hooks/useFiltrado";
import { useToggleEstado } from "@hooks/useToggleEstado";

import {
  obtenerMascotasUsuarios,
  eliminarMascota,
} from "@services/mascotaUsuarioService";
import {
  crearMascota,
  actualizarMascota,
  actualizarEstadoMascota,
} from "@services/mascotaService";

import TablaFiltrosUsuario from "./TablaFiltrosUsuario";
import ModalAgregarMascota from "./ModalAgregarMascota";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import ModalVerMascotaUsuario from "./ModalVerMascotaUsuario";
import ModalEditarMascotaUsuario from "./ModalEditarMascotaUsuario";

const TablaMascotaUsuario = () => {
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [modalMascotaOpen, setModalMascotaOpen] = useState(false);
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosMascotasUsuarios, setDatosMascotasUsuarios] = useState([]);
  const [mascotaEditando, setMascotaEditando] = useState(null);

  const cargarMascotas = async () => {
    try {
      const data = await obtenerMascotasUsuarios();
      setDatosMascotasUsuarios(data);
    } catch (error) {
      console.error("Error actualizando datos:", error);
    }
  };

  const registrarMascota = async (nuevaMascota) => {
    try {
      await crearMascota(nuevaMascota);
      await cargarMascotas();
    } catch (error) {
      console.error("Error al crear mascota:", error);
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  const { busqueda, handleSearch } = useBusqueda();
  const usuarioFiltrado = useFiltrado(
    datosMascotasUsuarios,
    ["nombre_mascota", "raza", "nombre_usuario", "dni"],
    busqueda
  );
  const toggleEstado = useToggleEstado(
    setDatosMascotasUsuarios,
    "id_mascota",
    actualizarEstadoMascota
  );

  const handleVer = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVerOpen(true);
  };

  const handleEditar = (fila) => {
    setMascotaEditando(fila);
    setModalEditarOpen(true);
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarMascota(id);
      await cargarMascotas();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <motion.div
      className="bg-superficie backdrop-blur-md shadow-lg rounded-xl p-6 border border-superficie-borde mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <TablaFiltrosUsuario
        busqueda={busqueda}
        handleSearch={handleSearch}
        onClickBoton={() => setModalMascotaOpen(true)}
      />

      <ModalAgregarMascota
        isOpen={modalMascotaOpen}
        onClose={() => setModalMascotaOpen(false)}
        onSubmit={registrarMascota}
        onAbrirModalUsuario={() => setModalUsuarioOpen(true)}
      />

      <ModalAgregarUsuario
        isOpen={modalUsuarioOpen}
        onClose={() => setModalUsuarioOpen(false)}
      />

      <ModalVerMascotaUsuario
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        usuario={usuarioSeleccionado}
      />

      <ModalEditarMascotaUsuario
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        mascota={mascotaEditando}
        onActualizar={async (mascotaEditada) => {
          await actualizarMascota(mascotaEditada);
          await cargarMascotas();
        }}
      />

      <TablaBase
        columnas={[
          { id: "nombre_usuario", label: "Nombre dueño" },
          { id: "dni", label: "DNI" },
          { id: "nombre_mascota", label: "Nombre Mascota" },
          { id: "raza", label: "Raza" },
          { id: "edad", label: "Edad" },
        ]}
        datos={usuarioFiltrado}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onToggleEstado={toggleEstado}
        idKey="id_mascota"
      />
    </motion.div>
  );
};

export default TablaMascotaUsuario;
