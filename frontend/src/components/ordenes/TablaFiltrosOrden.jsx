import TablaFiltros from "@common/tablas/TablaFiltros";

const TablaFiltrosOrdenes = ({
  busqueda,
  handleSearch,
  onClickBoton,
  filtros,
  setFiltros,
  veterinarios = [],
}) => {
  const filtroOptions = [
    {
      name: "veterinario",
      label: "Veterinario",
      value: filtros.veterinario,
      options: veterinarios.map((vet) => ({
        label: vet.nombre_completo,
        value: vet.id_veterinario.toString(), // ✅ ID como string
      })),
    },
    {
      name: "estado",
      label: "Estado",
      value: filtros.estado,
      options: [
        { label: "Cancelada", value: "cancelada" },
        { label: "No cancelado", value: "no_cancelado" },
      ],
    },
  ];

  return (
    <TablaFiltros
      busqueda={busqueda}
      handleSearch={handleSearch}
      filtros={filtroOptions}
      setFiltros={setFiltros}
      onClickBoton={onClickBoton}
      botonTexto="Crear Orden"
    />
  );
};

export default TablaFiltrosOrdenes;
