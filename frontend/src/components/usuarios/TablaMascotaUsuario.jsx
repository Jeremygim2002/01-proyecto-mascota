// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TablaFiltrosUsuario from "./TablaFiltrosUsuario";
import { useTablaDatos } from "@hooks/useTablaDatos";
import ModalAgregarMascota from "./ModalAgregarMascota";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import TablaBase from "@common/tablas/TablaBase";
import ModalVerMascotaUsuario from "./ModalVerMascotaUsuario";
import ModalEditarMascotaUsuario from "./ModalEditarMascotaUsuario";

import {
  obtenerMascotasUsuarios,
  eliminarMascota,
} from "@services/mascotaUsuarioService";
import { crearMascota, actualizarMascota } from "@services/mascotaService";

const TablaMascotaUsuario = () => {
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalMascotaOpen, setModalMascotaOpen] = useState(false);
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [datosMascotasUsuarios, setDatosMascotasUsuarios] = useState([]);
  const [mascotaEditando, setMascotaEditando] = useState(null);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  const cargarDatosMascotas = async () => {
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
      await cargarDatosMascotas();
    } catch (error) {
      console.error("Error al crear mascota:", error);
      alert("Error al crear la mascota");
    }
  };

  useEffect(() => {
    cargarDatosMascotas();
  }, []);

  const {
    busqueda,
    handleSearch,
    toggleEstado,
    datosFiltrados: usuarioFiltrado,
  } = useTablaDatos(
    datosMascotasUsuarios,
    ["nombre_mascota", "raza", "nombre_usuario", "dni"],
    "id_mascota"
  );

  const handleVerUsuario = (usuario) => {
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
      await cargarDatosMascotas();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar la mascota");
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
        onAbrirUsuario={() => setModalUsuarioOpen(true)}
      />

      <ModalAgregarUsuario
        isOpen={modalUsuarioOpen}
        onClose={() => setModalUsuarioOpen(false)}
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
        onVer={handleVerUsuario}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onToggleEstado={toggleEstado}
        idKey="id_mascota"
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
          await cargarDatosMascotas();
        }}
      />
    </motion.div>
  );
};

export default TablaMascotaUsuario;
