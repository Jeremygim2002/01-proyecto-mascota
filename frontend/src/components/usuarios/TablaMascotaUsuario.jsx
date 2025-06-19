// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import TablaBase from "@common/tablas/TablaBase";

import { useBusqueda } from "@hooks/useBusqueda";
import { useFiltrado } from "@hooks/useFiltrado";
import { useToggleEstado } from "@hooks/useToggleEstado";

import { obtenerMascotasUsuarios } from "@services/historialService";
import {
  eliminarMascota,
  crearMascota,
  actualizarEstadoMascota,
} from "@services/mascotaService";
import { actualizarUsuario } from "@services/usuarioService";

import TablaFiltrosUsuario from "./TablaFiltrosUsuario";
import ModalAgregarMascota from "./ModalAgregarMascota";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import ModalVerMascotaUsuario from "./ModalVerMascotaUsuario";
import ModalEditarUsuario from "./ModalEditarUsuario";

const TablaMascotaUsuario = () => {
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [modalMascotaOpen, setModalMascotaOpen] = useState(false);
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosMascotasUsuarios, setDatosMascotasUsuarios] = useState([]);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const cargarUsuarios = async () => {
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
      await cargarUsuarios();
    } catch (error) {
      console.error("Error al crear mascota:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
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
    setUsuarioEditando({
      id: fila.id_usuario,
      nombre: fila.nombre_usuario,
      apellido_paterno: fila.apellido_paterno,
      apellido_materno: fila.apellido_materno,
      correo: fila.correo,
      numero_telefono: fila.numero_telefono,
      dni: fila.dni,
    });
    setModalEditarOpen(true);
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarMascota(id);
      await cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
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

      <ModalEditarUsuario
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        usuario={usuarioEditando}
        onActualizar={async (usuarioEditado) => {
          await actualizarUsuario(usuarioEditado);
          await cargarUsuarios();
        }}
      />

      <TablaBase
        columnas={[
          { id: "nombre_usuario", label: "Nombre dueño" },
          { id: "dni", label: "DNI" },
          { id: "nombre_mascota", label: "Nombre Mascota" },
          { id: "raza", label: "Raza" },
          { id: "edad", label: "Edad" },
          { id: "tipo_mascota", label: "Tipo" },
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
