// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import TablaBase from "@common/tablas/TablaBase";

import { useBusqueda } from "@hooks/useBusqueda";
import { useFiltrado } from "@hooks/useFiltrado";
import { useToggleEstado } from "@hooks/useToggleEstado";

import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  actualizarEstadoServicio,
} from "@services/servicioService";
import { obtenerCategorias } from "@services/categoriaServicioService";

import TablaFiltrosServicio from "./TablaFiltrosServicio";
import ModalAgregarServicio from "./ModalAgregarServicio";
import ModalEditarServicio from "./ModalEditarServicio";
import ModalVerServicio from "./ModalVerServicio";

const TablaServicio = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
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

  const { busqueda, handleSearch } = useBusqueda();
  const serviciosFiltrados = useFiltrado(
    servicios,
    ["nombre", "categoria", "descripcion"],
    busqueda
  );
  const toggleEstado = useToggleEstado(
    setServicios,
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
          { id: "categoria", label: "Categoría" },
          { id: "nombre", label: "Servicio" },
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
