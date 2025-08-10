import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";

import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";
import { validatePartialVeterinario } from "@schemas/veterinarioSchema";

const ModalEditarVeterinario = ({ isOpen, onClose, onSubmit, veterinario }) => {
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [estado, setEstado] = useState(true);

  useEffect(() => {
    if (veterinario) {
      setCorreo(veterinario.correo || "");
      setNumeroTelefono(String(veterinario.numero_telefono ?? ""));
      setEstado(Boolean(veterinario.estado));
    }
  }, [veterinario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const veterinarioEditado = {
      id: veterinario.id_veterinario,
      correo,
      numero_telefono: numeroTelefono,
      estado: Boolean(estado),
    };

    const validacion = validatePartialVeterinario(veterinarioEditado);
    if (!validacion.success) {
      notificarErroresZod(validacion.error);
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
        </div>

        <div className="flex justify-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalEditarVeterinario;
