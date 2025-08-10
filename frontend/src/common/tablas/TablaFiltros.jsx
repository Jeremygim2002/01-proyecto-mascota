import { Search } from "lucide-react";
import Select from "@common/ui/Select";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";

const TablaFiltros = ({
  busqueda,
  handleSearch,
  filtros = [],
  setFiltros,
  onClickBoton,
  botonTexto = "Agregar",
}) => {
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros?.((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {filtros.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-texto font-tituloSecundario">
            Filtros
          </h2>
          <div className="flex flex-wrap gap-4 mt-4 w-full">
            {filtros.map(({ name, label, value, options = [] }) => (
              <div key={name} className="relative flex-1 min-w-[150px]">
                <Select
                  name={name}
                  className="w-full pl-3 pr-10"
                  value={value}
                  onChange={handleFiltroChange}
                >
                  <option value="">{label}</option>
                  {options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <Search size={18} />
          </span>
          <Input
            className="w-full pl-12 pr-10"
            name="buscar"
            type="text"
            placeholder="Buscar..."
            onChange={handleSearch}
            value={busqueda}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <Select name="cantidad_por_pagina" className="w-full sm:w-28">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </Select>

          <Button onClick={onClickBoton} className="uppercase w-full sm:w-auto">
            {botonTexto}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TablaFiltros;
