// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import TablaBase from "@common/tablas/TablaBase";
import { useBusqueda } from "@hooks/filtros/useBusqueda";
import { useToggleEstado } from "@hooks/common/useToggleEstado";
import useFiltroOrdenes from "@hooks/filtros/useFiltroOrdenes";

import {
  obtenerOrdenes,
  crearOrden,
  actualizarOrden,
  eliminarOrden,
  obtenerOrdenPorId,
  actualizarEstadoOrden,
} from "@services/ordenService";
import { obtenerVeterinarios } from "@services/veterinarioService";
import { notificarExito, notificarError } from "@lib/notificaciones";
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
  const [filtros, setFiltros] = useState({ veterinario: "", estado: "" });
  const [veterinarios, setVeterinarios] = useState([]);

  const { usuario: asistente } = useLogin();

  const cargarOrdenes = async () => {
    try {
      const data = await obtenerOrdenes();
      setOrdenes(data);
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    }
  };

  const cargarVeterinarios = async () => {
    try {
      const data = await obtenerVeterinarios();
      const conNombreCompleto = data.map((v) => ({
        ...v,
        nombre_completo: `${v.nombre} ${v.apellido_paterno ?? ""} ${v.apellido_materno ?? ""}`.trim(),
      }));
      setVeterinarios(conNombreCompleto);
    } catch (error) {
      console.error("Error al cargar veterinarios:", error);
    }
  };

  useEffect(() => {
    cargarOrdenes();
    cargarVeterinarios();
  }, []);

  const { busqueda, handleSearch } = useBusqueda();

  const ordenesFiltradas = useFiltroOrdenes(ordenes, filtros, busqueda);

  const ToggleEstado = useToggleEstado(
    setOrdenes,
    "id_orden",
    actualizarEstadoOrden
  );

const handleAgregar = async (nuevaOrden) => {
  try {
    await crearOrden(nuevaOrden);
    notificarExito("Orden registrada correctamente");
    setModalAgregar(false); 
    await cargarOrdenes();
  } catch (error) {
    console.error("Error al registrar orden:", error);
    notificarError(error.message || "Error al registrar orden");
  }
};


const handleActualizar = async (ordenEditada) => {
  try {
    await actualizarOrden(ordenEditada);
    notificarExito("Orden actualizada correctamente");
    setModalEditar(false); 
    await cargarOrdenes();
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    notificarError(error.message || "Error al actualizar orden");
  }
};


const handleEliminar = async (id) => {
  if (!asistente?.id) {
    console.error("No hay ID de asistente disponible");
    return;
  }

  try {
    await eliminarOrden(id, asistente.id);
    notificarExito("Orden eliminada correctamente"); 
    await cargarOrdenes();
  } catch (error) {
    console.error("Error al eliminar orden:", error);
    notificarError(error.message || "Error al eliminar orden");
  }
};


  const handleEditar = async (orden) => {
    const ordenCompleta = await obtenerOrdenPorId(orden.id_orden);
    setSeleccionado(ordenCompleta);
    setModalEditar(true);
  };

  const handleVer = (orden) => {
    setSeleccionado(orden);
    setModalVer(true);
  };

  const ordenesConFechaFormateada = ordenesFiltradas.map((orden) => ({
    ...orden,
    fecha: new Date(orden.fecha).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  }));

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
        filtros={filtros}
        setFiltros={setFiltros}
        veterinarios={veterinarios}
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
        datos={ordenesConFechaFormateada}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onToggleEstado={ToggleEstado}
        textoEstado={["Pagado", "No pagado"]}
        idKey="id_orden"
      />
    </motion.div>
  );
};

export default TablaOrden;
