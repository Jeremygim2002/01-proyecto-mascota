import TablaFiltros from "@common/tablas/TablaFiltros";

const TablaFiltrosVeterinario = ({
  busqueda,
  handleSearch,
  onClickBoton,
  filtros,
  setFiltros,
  especialidades = [],
}) => {
  const filtrosConfiguracion = [
    {
      name: "especialidad",
      label: "Especialidad",
      value: filtros.especialidad,
      options: especialidades.map((esp) => ({
        label: esp.nombre,
        value: esp.nombre,
      })),
    },
    {
      name: "estado",
      label: "Estado",
      value: filtros.estado,
      options: [
        { label: "Activo", value: "activo" },
        { label: "Inactivo", value: "inactivo" },
      ],
    },
  ];

  return (
    <TablaFiltros
      busqueda={busqueda}
      handleSearch={handleSearch}
      onClickBoton={onClickBoton}
      setFiltros={setFiltros}
      filtros={filtrosConfiguracion}
      botonTexto="Agregar veterinario"
      placeholder="Buscar personal..."
    />
  );
};

export default TablaFiltrosVeterinario;
