// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import TablaBase from "@common/tablas/TablaBase";
import { useBusqueda } from "@hooks/useBusqueda";
import { useFiltrado } from "@hooks/useFiltrado";
import { useToggleEstado } from "@hooks/useToggleEstado";

import {
  obtenerOrdenes,
  crearOrden,
  actualizarOrden,
  eliminarOrden,
} from "@services/ordenService";

import TablaFiltrosOrden from "./TablaFiltrosOrden";
import ModalAgregarOrden from "./ModalAgregarOrden";
import ModalEditarOrden from "./ModalEditarOrden";
import ModalVerOrden from "./ModalVerOrden";

import useLogin from "@hooks/useLogin";

const TablaOrden = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [ordenes, setOrdenes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  const { usuario: asistente } = useLogin();

  const cargarOrdenes = async () => {
    try {
      const data = await obtenerOrdenes();
      setOrdenes(data);
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const { busqueda, handleSearch } = useBusqueda();
  const ordenesFiltradas = useFiltrado(
    ordenes,
    ["usuario", "nombre_mascota", "veterinario", "servicio"],
    busqueda
  );
  const toggleEstado = useToggleEstado(
    setOrdenes,
    "id_orden",
    async (id, nuevoEstado) => {
      try {
        await actualizarOrden({ id, estado: nuevoEstado });
      } catch (error) {
        console.error("Error actualizando estado:", error);
      }
    }
  );

  const handleAgregar = async (nuevaOrden) => {
    await crearOrden(nuevaOrden);
    await cargarOrdenes();
  };

  const handleActualizar = async (ordenEditada) => {
    await actualizarOrden(ordenEditada);
    await cargarOrdenes();
  };

  const handleEliminar = async (id) => {
    if (!asistente?.id) {
      console.error("No hay ID de asistente disponible");
      return;
    }

    await eliminarOrden(id, asistente.id);
    await cargarOrdenes();
  };

  const handleEditar = (orden) => {
    setSeleccionado(orden);
    setModalEditar(true);
  };

  const handleVer = (orden) => {
    setSeleccionado(orden);
    setModalVer(true);
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
        onClickBoton={() => setModalAgregar(true)}
      />

      <ModalAgregarOrden
        isOpen={modalAgregar}
        onClose={() => setModalAgregar(false)}
        onSubmit={handleAgregar}
      />

      <ModalEditarOrden
        isOpen={modalEditar}
        onClose={() => setModalEditar(false)}
        onSubmit={handleActualizar}
        orden={seleccionado}
      />

      <ModalVerOrden
        isOpen={modalVer}
        onClose={() => setModalVer(false)}
        orden={seleccionado}
      />

      <TablaBase
        columnas={[
          { id: "usuario", label: "Usuario" },
          { id: "nombre_mascota", label: "Mascota" },
          { id: "veterinario", label: "Veterinario" },
          { id: "servicio", label: "Servicio" },
          { id: "precio", label: "Precio S/." },
          { id: "fecha", label: "Fecha" },
          { id: "hora_inicio", label: "Hora Inicio" },
          { id: "hora_fin", label: "Hora Fin" },
        ]}
        datos={ordenesFiltradas}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onToggleEstado={toggleEstado}
        idKey="id_orden"
      />
    </motion.div>
  );
};

export default TablaOrden;
