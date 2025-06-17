// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import TablaBase from "@common/tablas/TablaBase";

import { useBusqueda } from "@hooks/useBusqueda";
import { useFiltrado } from "@hooks/useFiltrado";
import { useToggleEstado } from "@hooks/useToggleEstado";

import {
  obtenerVeterinarios,
  actualizarEstadoVeterinario,
  crearVeterinario,
  eliminarVeterinario,
  actualizarVeterinario,
} from "@services/veterinarioService";
import { obtenerEspecialidades } from "@services/especialidadVeterinarioService";

import TablaFiltrosVeterinario from "./TablaFiltrosVeterinario";
import ModalAgregarVeterinario from "./ModalAgregarVeterinario";
import ModalEditarVeterinario from "./ModalEditarVeterinario";
import ModalVerVeterinario from "./ModalVerVeterinario";

const TablaVeterinario = () => {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [veterinarios, setVeterinarios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarVeterinarios = async () => {
    const data = await obtenerVeterinarios();
    setVeterinarios(data);
  };

  const cargarEspecialidades = async () => {
    const data = await obtenerEspecialidades();
    setEspecialidades(data);
  };

  useEffect(() => {
    cargarVeterinarios();
    cargarEspecialidades();
  }, []);

  const { busqueda, handleSearch } = useBusqueda();
  const veterinariosFiltrados = useFiltrado(
    veterinarios,
    ["nombre", "dni", "especialidad"],
    busqueda
  );
  const toggleEstado = useToggleEstado(
    setVeterinarios,
    "id_veterinario",
    actualizarEstadoVeterinario
  );

  const handleAgregar = async (nuevoVeterinario) => {
    await crearVeterinario(nuevoVeterinario);
    await cargarVeterinarios();
  };

  const handleActualizar = async (veterinarioEditado) => {
    await actualizarVeterinario(veterinarioEditado);
    await cargarVeterinarios();
  };

  const handleEliminar = async (id) => {
    await eliminarVeterinario(id);
    await cargarVeterinarios();
  };

  const handleEditar = (vet) => {
    setSeleccionado(vet);
    setModalEditar(true);
  };

  const handleVer = (vet) => {
    setSeleccionado(vet);
    setModalVer(true);
  };
  return (
    <motion.div
      className="bg-superficie backdrop-blur-md shadow-lg rounded-xl p-6 border border-superficie-borde mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <TablaFiltrosVeterinario
        busqueda={busqueda}
        handleSearch={handleSearch}
        onClickBoton={() => setModalAgregar(true)}
      />
      <ModalAgregarVeterinario
        isOpen={modalAgregar}
        onClose={() => setModalAgregar(false)}
        onSubmit={handleAgregar}
        especialidades={especialidades}
      />

      <ModalEditarVeterinario
        isOpen={modalEditar}
        onClose={() => setModalEditar(false)}
        onSubmit={handleActualizar}
        veterinario={seleccionado}
        especialidades={especialidades}
      />
      <ModalVerVeterinario
        isOpen={modalVer}
        onClose={() => setModalVer(false)}
        veterinario={seleccionado}
        especialidades={especialidades}
      />

      <TablaBase
        columnas={[
          { id: "nombre", label: "Nombre" },
          { id: "correo", label: "Correo" },
          { id: "numero_telefono", label: "Teléfono" },
          { id: "dni", label: "DNI" },
          { id: "especialidad", label: "Especialidad" },
        ]}
        datos={veterinariosFiltrados}
        onVer={handleVer}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onToggleEstado={(id, estado) => toggleEstado(id, estado)}
        idKey="id_veterinario"
      />
    </motion.div>
  );
};

export default TablaVeterinario;
