import TablaFiltros from "@common/tablas/TablaFiltros";

const TablaFiltrosServicio = ({
  busqueda,
  handleSearch,
  onClickBoton,
  filtros,
  setFiltros,
  categorias = [],
}) => {
  const filtrosConfiguracion = [
    {
      name: "categoria",
      label: "Categoría",
      value: filtros.categoria,
      options: categorias.map((cat) => ({
        label: cat.nombre,
        value: cat.nombre,
      })),
    },
    {
      name: "estado",
      label: "Estado",
      value: filtros.estado,
      options: [
        { label: "Disponible", value: "disponible" },
        { label: "No disponible", value: "no_disponible" },
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
      botonTexto="Agregar servicio"
    />
  );
};

export default TablaFiltrosServicio;
