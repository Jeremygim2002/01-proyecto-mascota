// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import FiltroTabla from "../common/TablaFiltros";
import { useTablaDatos } from "../../hooks/useTablaDatos";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import TablaBase from "../common/TablaBase";
import ModalVerUsuario from "./ModalVerUsuario";

// Datos de ejemplo
const DATA_USUARIOS = [
  {
    id: 1,
    nombre_usuario: "Juan Pérez",
    dni: 345646546,
    nombre_mascota: "Max",
    raza_mascota: "Labrador",
    edad_mascota: 5,
    estado: true,
  },
  {
    id: 2,
    nombre_usuario: "Juan Pérez",
    dni: 34546,
    nombre_mascota: "Max",
    raza_mascota: "Labrador",
    edad_mascota: 5,
    estado: true,
  },
  {
    id: 3,
    nombre_usuario: "Juan Pérez",
    dni: 34546,
    nombre_mascota: "Max",
    raza_mascota: "Labrador",
    edad_mascota: 5,
    estado: true,
  },
  {
    id: 4,
    nombre_usuario: "Juan Pérez",
    dni: 34564654,
    nombre_mascota: "Max",
    raza_mascota: "Labrador",
    edad_mascota: 5,
    estado: true,
  },
  {
    id: 5,
    nombre_usuario: "Juan Pérez",
    dni: 346546,
    nombre_mascota: "Max",
    raza_mascota: "Labrador",
    edad_mascota: 5,
    estado: true,
  },
];

const TablaUsuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleAgregar = (nuevoServicio) => {
    // Aquí actualizas tu estado o envías a la base de datos
    console.log("Nuevo personal:", nuevoServicio);
  };
  const {
    busqueda,
    handleSearch,
    toggleEstado,
    datosFiltrados: usuarioFiltrado,
  } = useTablaDatos(DATA_USUARIOS, ["nombre_mascota", "raza_mascota"]);

  const handleVerUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalVerOpen(true);
  };

  return (
    <motion.div
      className="bg-superficie backdrop-blur-md shadow-lg rounded-xl p-6 border border-superficie-borde mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <FiltroTabla
        busqueda={busqueda}
        handleSearch={handleSearch}
        filtro_1={{
          label: "Categoría",
          options: [
            { value: "medicina", label: "Medicina Preventiva" },
            { value: "diagnostico", label: "Diagnóstico y Tratamiento" },
            { value: "peluqueria", label: "Peluquería y Estética" },
          ],
        }}
        filtro_2={{
          label: "Disponibilidad",
          options: [
            { value: "disponible", label: "Disponible" },
            { value: "no_disponible", label: "No disponible" },
          ],
        }}
        filtro_3={{
          label: "Precio",
          options: [
            { value: "mayor", label: "Mayor a 100" },
            { value: "menor", label: "Menor a 100" },
          ],
        }}
        botonTexto="Agregar usuario"
        onClickBoton={() => setModalOpen(true)}
      />
      <ModalAgregarUsuario
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAgregar}
      />

      <TablaBase
        columnas={[
          { id: "id", label: "ID" },
          { id: "nombre_usuario", label: "Nombre dueño" },
          { id: "dni", label: "dni" },
          { id: "nombre_mascota", label: "nombre mascota" },
          { id: "raza_mascota", label: "raza" },
          { id: "edad_mascota", label: "edad" },
        ]}
        datos={usuarioFiltrado}
        onVer={handleVerUsuario}
        onEditar={(p) => console.log("Editar", p)}
        onEliminar={(id) => console.log("Eliminar ID:", id)}
        onToggleEstado={toggleEstado}
      />

      <ModalVerUsuario
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        usuario={usuarioSeleccionado}
      />
    </motion.div>
  );
};

export default TablaUsuarios;
