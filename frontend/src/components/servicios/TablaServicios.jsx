// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import FiltroTabla from "../common/TablaFiltros";
import { useTablaDatos } from "../../hooks/useTablaDatos";
import { useState } from "react";
import ModalAgregarServicio from "./ModalAgregarServicio";
import TablaBase from "../common/TablaBase";
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

const TablaServicios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVerOpen, setModalVerOpen] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const handleAgregar = (nuevoServicio) => {
    console.log("Nuevo personal:", nuevoServicio);
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
        botonTexto="Agregar servicio"
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

export default TablaServicios;
