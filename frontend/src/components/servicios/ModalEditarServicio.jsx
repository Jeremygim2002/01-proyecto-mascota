import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";

import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";
import { validatePartialServicio } from "@schemas/servicioSchema";

const ModalEditarServicio = ({
  isOpen,
  onClose,
  onSubmit,
  servicio,
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);

  useEffect(() => {
    if (servicio) {
      setDescripcion(servicio.descripcion || "");
      setDuracion(String(servicio.duracion || ""));
      setPrecio(String(servicio.precio || ""));
      setEstado(Boolean(servicio.estado));
    }
  }, [servicio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const servicioEditado = {
      id: servicio.id_servicio,
      descripcion,
      duracion: Number(duracion),
      precio: Number(precio),
      estado: Boolean(estado),
    };

    const validacion = validatePartialServicio(servicioEditado);
    if (!validacion.success) {
      notificarErroresZod(validacion.error);
      return;
    }

    try {
      await onSubmit(servicioEditado);
      notificarExito("Servicio actualizado correctamente.");
      onClose();
    } catch (error) {
      console.error("Error al actualizar servicio:", error);
      notificarError("No se pudo actualizar el servicio.");
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Editar servicio">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
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
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalEditarServicio;
