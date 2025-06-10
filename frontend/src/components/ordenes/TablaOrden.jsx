// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import TablaFiltrosOrden from "./TablaFiltrosOrden";
import { useTablaDatos } from "@hooks/useTablaDatos";
import ModalAgregarOrden from "./ModalAgregarOrden";
import TablaBase from "@common/tablas/TablaBase";
import ModalVerOrden from "./ModalVerOrden";

// Datos de ejemplo
const DATA_ORDENES = [
  {
    id: 1,
    servicio: "baño",
    dueno: "Carlos Pérez",
    nombre_mascota: "lana",
    veterinario: "juan cubillas",
    fecha: "2025-05-01",
    estado: true, // Activo
  },
  {
    id: 2,
    servicio: "baño",
    dueno: "Carlos Pérez",
    nombre_mascota: "lana",
    veterinario: "juan cubillas",
    fecha: "2025-05-01",
    estado: true, // Activo
  },
  {
    id: 3,
    servicio: "baño",
    dueno: "Carlos Pérez",
    nombre_mascota: "lana",
    veterinario: "juan cubillas",
    fecha: "2025-05-01",
    estado: true, // Activo
  },
  {
    id: 4,
    servicio: "baño",
    dueno: "Carlos Pérez",
    nombre_mascota: "lana",
    veterinario: "juan cubillas",
    fecha: "2025-05-01",
    estado: true, // Activo
  },
  {
    id: 5,
    servicio: "baño",
    dueno: "Carlos Pérez",
    nombre_mascota: "lana",
    veterinario: "juan cubillas",
    fecha: "2025-05-01",
    estado: true, // Activo
  },
];

const TablaOrden = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState(null);

  const handleAgregar = (nuevoVeterinario) => {
    console.log("Nuevo veterinario:", nuevoVeterinario);
  };

  const {
    busqueda,
    handleSearch,
    toggleEstado,
    datosFiltrados: ordenFiltrado,
  } = useTablaDatos(DATA_ORDENES, ["dueno", "servicio"]);

  const handleVerOrden = (orden) => {
    setOrdenSeleccionado(orden);
    setModalVerOpen(true);
  };

  return (
    <motion.div
      className="bg-superficie backdrop-blur-md shadow-lg rounded-xl p-6 border border-superficie-borde mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <TablaFiltrosOrden
        busqueda={busqueda}
        handleSearch={handleSearch}
        onClickBoton={() => setModalOpen(true)}
      />

      <ModalAgregarOrden
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAgregar}
      />

      <TablaBase
        columnas={[
          { id: "id", label: "ID" },
          { id: "servicio", label: "Servicio" },
          { id: "dueno", label: "Dueño" },
          { id: "nombre_mascota", label: "Nombre mascota" },
          { id: "veterinario", label: "veterinario" },
          { id: "fecha", label: "fecha" },
        ]}
        datos={ordenFiltrado}
        onVer={handleVerOrden}
        onEditar={(p) => console.log("Editar", p)}
        onEliminar={(id) => console.log("Eliminar ID:", id)}
        onToggleEstado={toggleEstado}
      />

      <ModalVerOrden
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        orden={ordenSeleccionado}
      />
    </motion.div>
  );
};

export default TablaOrden;
