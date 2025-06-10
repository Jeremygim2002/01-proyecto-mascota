import { Search } from "lucide-react";
import Select from "@common/ui/Select";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";

const TablaFiltrosVeterinario = ({ busqueda, handleSearch, onClickBoton }) => {
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
            <Select name="rol" className="w-full pl-3 pr-10">
              <option value="">Rol</option>
              <option value="veterinario">Veterinario</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="administrador">Administrador</option>
            </Select>
          </div>

          <div className="relative flex-1 min-w-[150px]">
            <Select name="estado" className="w-full pl-3 pr-10">
              <option value="">Estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </Select>
          </div>

          <div className="relative flex-1 min-w-[150px]">
            <Select name="correo" className="w-full pl-3 pr-10">
              <option value="">Correo</option>
              <option value="gmail">Gmail</option>
              <option value="example">Example.com</option>
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
            name="buscar_veterinario"
            type="text"
            placeholder="Buscar personal..."
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
            Agregar veterinario
          </Button>
        </div>
      </div>
    </>
  );
};

export default TablaFiltrosVeterinario;
