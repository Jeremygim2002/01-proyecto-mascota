// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import TablaFiltrosServicio from "./TablaFiltrosServicio";
import { useTablaDatos } from "@hooks/useTablaDatos";
import { useState } from "react";
import ModalAgregarServicio from "./ModalAgregarServicio";
import TablaBase from "@common/tablas/TablaBase";
import ModalVerServicio from "./ModalVerServicio";

// Datos de ejemplo
const DATA_SERVICIOS = [
  {
    id: 1,
    categoria: "Peluquería y Estética",
    tipo: "baño",
    descripcion: "Baño y corte de pelo",
    duracion: "30",
    precio: 59.99,
    estado: true,
  },
  {
    id: 2,
    categoria: "Peluquería y Estética",
    tipo: "baño",
    descripcion: "Baño y corte de pelo",
    duracion: "30",
    precio: 39.99,
    estado: true,
  },
  {
    id: 3,
    categoria: "Medicina Preventiva",
    tipo: "baño",
    descripcion: "Baño y corte de pelo",
    duracion: "30",
    precio: 199.99,
    estado: true,
  },
  {
    id: 4,
    categoria: "Medicina Preventiva",
    tipo: "baño",
    descripcion: "Baño y corte de pelo",
    duracion: "30",
    precio: 29.99,
    estado: true,
  },
  {
    id: 5,
    categoria: "Diagnóstico y Tratamiento",
    tipo: "baño",
    descripcion: "Baño y corte de pelo",
    duracion: "30",
    precio: 79.99,
    estado: false,
  },
];

const TablaServicio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const handleAgregar = (nuevoServicio) => {
    console.log("Nuevo servicio:", nuevoServicio);
  };
  const {
    busqueda,
    handleSearch,
    toggleEstado,
    datosFiltrados: servicioFiltrado,
  } = useTablaDatos(DATA_SERVICIOS, ["categoria", "tipo"]);

  const handleVerServicios = (servicio) => {
    setServicioSeleccionado(servicio);
    setModalVerOpen(true);
  };

  return (
    <motion.div
      className="bg-superficie backdrop-blur-md shadow-lg rounded-xl p-6 border border-superficie-borde mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <TablaFiltrosServicio
        busqueda={busqueda}
        handleSearch={handleSearch}
        onClickBoton={() => setModalOpen(true)}
      />

      <ModalAgregarServicio
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAgregar}
      />

      <TablaBase
        columnas={[
          { id: "id", label: "ID" },
          { id: "categoria", label: "Categoria" },
          { id: "tipo", label: "Tipo" },
          { id: "descripcion", label: "Descripcion" },
          { id: "duracion", label: "Duracion" },
          { id: "precio", label: "Precio" },
        ]}
        datos={servicioFiltrado}
        onVer={handleVerServicios}
        onEditar={(p) => console.log("Editar", p)}
        onEliminar={(id) => console.log("Eliminar ID:", id)}
        onToggleEstado={toggleEstado}
      />

      <ModalVerServicio
        isOpen={modalVerOpen}
        onClose={() => setModalVerOpen(false)}
        servicio={servicioSeleccionado}
      />
    </motion.div>
  );
};

export default TablaServicio;
