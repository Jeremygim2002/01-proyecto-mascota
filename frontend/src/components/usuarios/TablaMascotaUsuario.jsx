// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TablaFiltrosUsuario from "./TablaFiltrosUsuario";
import { useTablaDatos } from "@hooks/useTablaDatos";
import ModalAgregarMascota from "./ModalAgregarMascota";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import TablaBase from "@common/tablas/TablaBase";
import ModalVerMascotaUsuario from "./ModalVerMascotaUsuario";
import {
  obtenerMascotasUsuarios,
  eliminarMascota,
} from "@services/mascotaUsuarioService";
import { crearMascota } from "@services/mascotaService";

const TablaMascotaUsuario = () => {
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalMascotaOpen, setModalMascotaOpen] = useState(false);
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [datosMascotasUsuarios, setDatosMascotasUsuarios] = useState([]);

  const registrarMascota = async (nuevaMascota) => {
    try {
      await crearMascota(nuevaMascota);
      const data = await obtenerMascotasUsuarios(); // Recarga datos
      setDatosMascotasUsuarios(data); // Refresca tabla
    } catch (error) {
      console.error("Error al crear mascota:", error);
      alert("Error al crear la mascota");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await obtenerMascotasUsuarios();
        setDatosMascotasUsuarios(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
        console.error("Error cargando datos:", error);
      }
    }
    fetchData();
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

  const registrarUsuarioNuevo = (nuevoUsuario) => {
    console.log("Nuevo usuario agregado:", nuevoUsuario);
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
        onSubmit={registrarUsuarioNuevo}
      />

      <TablaBase
        columnas={[
          // { id: "id_mascota", label: "ID Mascota" },
          { id: "nombre_usuario", label: "Nombre dueño" },
          { id: "dni", label: "DNI" },
          { id: "nombre_mascota", label: "Nombre Mascota" },
          { id: "raza", label: "Raza" },
          { id: "edad", label: "Edad" },
        ]}
        datos={usuarioFiltrado}
        onVer={handleVerUsuario}
        onEditar={(p) => console.log("Editar", p)}
        onEliminar={async (id) => {
          console.log("ID a eliminar:", id);
          try {
            await eliminarMascota(id); // ← servicio importado desde mascotaUsuarioService.js
            const data = await obtenerMascotasUsuarios(); // recarga
            setDatosMascotasUsuarios(data);
          } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar la mascota");
          }
        }}
        onToggleEstado={toggleEstado}
        idKey="id_mascota"
      />

      <ModalVerMascotaUsuario
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        usuario={usuarioSeleccionado}
      />
    </motion.div>
  );
};

export default TablaMascotaUsuario;
