import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";

import { notificarError, notificarExito } from "@lib/notificaciones";
import { validateVeterinario } from "@schemas/veterinarioSchema";

const ModalEditarVeterinario = ({
  isOpen,
  onClose,
  onSubmit,
  veterinario,
  especialidades = [],
}) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [estado, setEstado] = useState(true);
  const [idEspecialidad, setIdEspecialidad] = useState("");

  useEffect(() => {
    if (veterinario) {
      setNombre(veterinario.nombre || "");
      setApellidoPaterno(veterinario.apellido_paterno || "");
      setApellidoMaterno(veterinario.apellido_materno || "");
      setCorreo(veterinario.correo || "");
      setNumeroTelefono(String(veterinario.numero_telefono ?? ""));
      setDni(String(veterinario.dni ?? ""));
      setEstado(Boolean(veterinario.estado));
      setIdEspecialidad(String(veterinario.id_especialidad ?? ""));
    }
  }, [veterinario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const veterinarioEditado = {
      id: veterinario.id_veterinario,
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      correo,
      numero_telefono: numeroTelefono, 
      dni,
      estado: Boolean(estado),
      id_especialidad: idEspecialidad, 
    };

    const validacion = validateVeterinario(veterinarioEditado);
    if (!validacion.success) {
      const errores = validacion.error.format();
      for (const campo in errores) {
        const mensaje = errores[campo]?._errors?.[0];
        if (mensaje) notificarError(mensaje);
      }
      return;
    }

    try {
      await onSubmit(veterinarioEditado);
      notificarExito("Veterinario actualizado correctamente.");
      onClose();
    } catch (error) {
      console.error("Error al actualizar veterinario:", error);
      notificarError("No se pudo actualizar el veterinario.");
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Editar veterinario">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Input
            className="col-span-4 pl-4"
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            type="text"
            name="apellidoPaterno"
            id="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            type="text"
            name="apellidoMaterno"
            id="apellidoMaterno"
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            type="email"
            name="correo"
            id="correo"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            type="number"
            name="numeroTelefono"
            id="numeroTelefono"
            placeholder="Numero de telefono"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            type="number"
            name="dni"
            id="dni"
            placeholder="Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <Select
            className="col-span-2"
            value={idEspecialidad}
            onChange={(e) => setIdEspecialidad(e.target.value)}
          >
            <option value="">Seleccione especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalEditarVeterinario;
