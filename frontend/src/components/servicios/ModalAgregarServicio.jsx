import { useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";

import { useResetFormulario } from "@hooks/filtros/useResetFormulario";
import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";
import { validateServicio } from "@schemas/servicioSchema";

const ModalAgregarServicio = ({
  isOpen,
  onClose,
  onSubmit,
  categorias = [],
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  const resetCampos = useResetFormulario(
    [setNombre, setDescripcion, setDuracion, setPrecio, setIdCategoria],
    ["", "", "", "", ""]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoServicio = {
      nombre,
      descripcion,
      duracion: Number(duracion),
      precio: Number(precio),
      id_categoria: Number(idCategoria),
      estado: true,
    };

    const validacion = validateServicio(nuevoServicio);
    if (!validacion.success) {
      notificarErroresZod(validacion.error); 
      return;
    }

    try {
      await onSubmit(nuevoServicio);
      notificarExito("Servicio registrado correctamente.");
      resetCampos();
      onClose();
    } catch (error) {
      console.error("Error al crear servicio:", error);
      notificarError("Ocurrió un error al registrar el servicio.");
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar servicio">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Select
            className="col-span-2"
            name="idCategoria"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </Select>
          <Input
            className="col-span-2 pl-4"
            name="nombre"
            type="text"
            placeholder="Nombre del servicio"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Input
            className="col-span-4 pl-4"
            name="descripcion"
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            name="duracion"
            type="number"
            placeholder="Duración (min)"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            name="precio"
            type="number"
            placeholder="Precio S/."
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarServicio;
