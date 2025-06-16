// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import TablaFiltrosServicio from "./TablaFiltrosServicio";
import ModalAgregarServicio from "./ModalAgregarServicio";
import ModalEditarServicio from "./ModalEditarServicio";
import ModalVerServicio from "./ModalVerServicio";
import TablaBase from "@common/tablas/TablaBase";

import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  actualizarEstadoServicio,
} from "@services/servicioService";

import { obtenerCategorias } from "@services/categoriaServicioService";
import { useTablaDatos } from "@hooks/useTablaDatos";

const TablaServicio = () => {
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarServicios = async () => {
    const data = await obtenerServicios();
    setServicios(data);
  };

  const cargarCategorias = async () => {
    const data = await obtenerCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    cargarServicios();
    cargarCategorias();
  }, []);

  const {
    busqueda,
    handleSearch,
    toggleEstado,
    datosFiltrados: serviciosFiltrados,
  } = useTablaDatos(
    servicios,
    ["nombre", "categoria", "descripcion"],
    "id_servicio",
    actualizarEstadoServicio
  );

  const handleAgregar = async (nuevoServicio) => {
    await crearServicio(nuevoServicio);
    await cargarServicios();
  };

  const handleActualizar = async (servicioEditado) => {
    await actualizarServicio(servicioEditado);
    await cargarServicios();
  };

  const handleEliminar = async (id) => {
    await eliminarServicio(id);
    await cargarServicios();
  };

  const handleEditar = (servicio) => {
    setSeleccionado(servicio);
    setModalEditar(true);
  };

  const handleVer = (servicio) => {
    setSeleccionado(servicio);
    setModalVer(true);
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
        onClickBoton={() => setModalAgregar(true)}
      />

      <ModalAgregarServicio
        isOpen={modalAgregar}
        onClose={() => setModalAgregar(false)}
        onSubmit={handleAgregar}
        categorias={categorias}
      />

      <ModalEditarServicio
        isOpen={modalEditar}
        onClose={() => setModalEditar(false)}
        onSubmit={handleActualizar}
        servicio={seleccionado}
        categorias={categorias}
      />

      <ModalVerServicio
        isOpen={modalVer}
        onClose={() => setModalVer(false)}
        servicio={seleccionado}
      />

      <TablaBase
        columnas={[
          { id: "nombre", label: "Nombre" },
          { id: "categoria", label: "Categoría" },
          { id: "descripcion", label: "Descripción" },
          { id: "duracion", label: "Duración" },
          { id: "precio", label: "Precio" },
        ]}
        datos={serviciosFiltrados}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onToggleEstado={toggleEstado}
        idKey="id_servicio"
      />


    </motion.div>
  );
};

export default TablaServicio;
