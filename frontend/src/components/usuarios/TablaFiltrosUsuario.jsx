import TablaFiltros from "@common/tablas/TablaFiltros";

const TablaFiltrosUsuario = ({
  busqueda,
  handleSearch,
  onClickBoton,
  filtros,
  setFiltros,
  tiposMascota = [],
}) => {
  const filtrosConfiguracion = [
    {
      name: "tipo",
      label: "Tipo de Mascota",
      value: filtros.tipo,
      options: tiposMascota.map((tipo) => ({
        label: tipo.nombre,
        value: tipo.nombre,
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
      botonTexto="Agregar mascota"
      placeholder="Buscar usuario..."
    />
  );
};

export default TablaFiltrosUsuario;
