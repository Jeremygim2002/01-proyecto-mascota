import { Search } from "lucide-react";
import Select from "./forms/Select";
import Input from "./forms/Input";
import Button from "./forms/Button";

const TablaFiltros = ({
  busqueda,
  handleSearch,
  filtro_1,
  filtro_2,
  filtro_3,
  botonTexto,
  onClickBoton,
}) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-start">
          <h2 className="text-xl font-semibold text-texto font-tituloSecundario">
            Filtros
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 w-full">
          {/* Filtro 1 */}
          <div className="relative flex-1 min-w-[150px]">
            <Select name="filtro_1" className="w-full pl-3 pr-10 ">
              <option value="">{filtro_1.label}</option>
              {filtro_1.options.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Filtro 2 */}
          <div className="relative flex-1 min-w-[150px]">
            <Select name="filtro_2" className="w-full pl-3 pr-10">
              <option value="">{filtro_2.label}</option>
              {filtro_2.options.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Filtro 3 */}
          <div className="relative flex-1 min-w-[150px]">
            <Select name="filtro_3" className="w-full pl-3 pr-10">
              <option value="">{filtro_3.label}</option>
              {filtro_3.options.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Buscador + Paginación + Agregar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Buscador */}
        <div className="relative w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <Search size={18} />
          </span>
          <Input
            className="w-full pl-12 pr-10"
            name="buscar_filtros"
            type="text"
            placeholder="Buscar ..."
            onChange={handleSearch}
            value={busqueda}
          />
        </div>

        {/* Selector + Botón */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <Select name="cantidad_por_pagina" className="w-full sm:w-28">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </Select>

          <Button onClick={onClickBoton} className="uppercase w-full sm:w-auto">
            {botonTexto || "Agregar"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TablaFiltros;
