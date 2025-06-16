import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";

import { notificarError, notificarExito } from "@lib/notificaciones";
import { validateServicio } from "@schemas/serviciosSchema";

const ModalEditarServicio = ({
  isOpen,
  onClose,
  onSubmit,
  servicio,
  categorias = [],
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);
  const [idCategoria, setIdCategoria] = useState("");

  useEffect(() => {
    if (servicio) {
      setNombre(servicio.nombre || "");
      setDescripcion(servicio.descripcion || "");
      setDuracion(String(servicio.duracion || ""));
      setPrecio(String(servicio.precio || ""));
      setEstado(Boolean(servicio.estado));
      setIdCategoria(String(servicio.id_categoria || ""));
    }
  }, [servicio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const servicioEditado = {
      id: servicio.id_servicio,
      nombre,
      descripcion,
      duracion: Number(duracion),
      precio: Number(precio),
      estado: Boolean(estado),
      id_categoria: Number(idCategoria),
    };

    const validacion = validateServicio(servicioEditado);
    if (!validacion.success) {
      const errores = validacion.error.format();
      for (const campo in errores) {
        const mensaje = errores[campo]?._errors?.[0];
        if (mensaje) notificarError(mensaje);
      }
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
            className="col-span-2 pl-4"
            name="nombre"
            type="text"
            placeholder="Nombre del servicio"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

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
