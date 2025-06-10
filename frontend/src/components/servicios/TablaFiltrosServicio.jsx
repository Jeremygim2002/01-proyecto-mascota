import { Search } from "lucide-react";
import Select from "@common/ui/Select";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";

const TablaFiltrosServicio = ({ busqueda, handleSearch, onClickBoton }) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-start">
          <h2 className="text-xl font-semibold text-texto font-tituloSecundario">
            Filtros
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 w-full">
          <div className="relative flex-1 min-w-[150px]">
            <Select name="categoria" className="w-full pl-3 pr-10">
              <option value="">Categoría</option>
              <option value="medicina">Medicina Preventiva</option>
              <option value="diagnostico">Diagnóstico y Tratamiento</option>
              <option value="peluqueria">Peluquería y Estética</option>
            </Select>
          </div>

          <div className="relative flex-1 min-w-[150px]">
            <Select name="estado" className="w-full pl-3 pr-10">
              <option value="">Estado</option>
              <option value="disponible">Disponible</option>
              <option value="no_disponible">No disponible</option>
            </Select>
          </div>

          <div className="relative flex-1 min-w-[150px]">
            <Select name="precio" className="w-full pl-3 pr-10">
              <option value="">Precio</option>
              <option value="mayor">Mayor a 100</option>
              <option value="menor">Menor a 100</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <Search size={18} />
          </span>
          <Input
            className="w-full pl-12 pr-10"
            name="buscar_servicios"
            type="text"
            placeholder="Buscar servicio..."
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
            Agregar servicio
          </Button>
        </div>
      </div>
    </>
  );
};

export default TablaFiltrosServicio;