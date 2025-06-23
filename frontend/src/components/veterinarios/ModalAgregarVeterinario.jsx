import { useState } from "react";

import { validateVeterinario } from "@schemas/veterinarioSchema";
import { useResetFormulario } from "@hooks/filtros/useResetFormulario";

import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";

import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";

const ModalAgregarVeterinario = ({
  isOpen,
  onClose,
  onSubmit,
  especialidades = [],
}) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [idEspecialidad, setIdEspecialidad] = useState("");

  const resetFormulario = useResetFormulario(
    [
      setNombre,
      setApellidoPaterno,
      setApellidoMaterno,
      setCorreo,
      setNumeroTelefono,
      setDni,
      setIdEspecialidad,
    ],
    ["", "", "", "", "", "", ""]
  );

  const handleRegistrar = async (e) => {
    e.preventDefault();

    const nuevoVeterinario = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      correo,
      numero_telefono: numeroTelefono,
      dni,
      id_especialidad: Number(idEspecialidad),
      estado: true,
    };

    const validacion = validateVeterinario(nuevoVeterinario);
    if (!validacion.success) {
      notificarErroresZod(validacion.error);
      return;
    }

    try {
      await onSubmit(nuevoVeterinario);
      notificarExito("Veterinario registrado correctamente.");
      resetFormulario();
      onClose();
    } catch (error) {
      console.error("Error al crear veterinario:", error);
      notificarError("Ocurrió un error al registrar el veterinario.");
    }
  };
  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar veterinario">
      <form onSubmit={handleRegistrar} className="space-y-4">
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
            <option value="">Seleccione Especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}
          </Select>
        </div>

        <Button type="submit">Agregar</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarVeterinario;
