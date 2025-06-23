import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";
import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";
import { actualizarUsuario, obtenerUsuarios } from "@services/usuarioService";
import { validatePartialUsuario } from "@schemas/usuarioSchema";

const ModalEditarUsuario = ({ isOpen, onClose, usuario, onActualizar }) => {
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");

  useEffect(() => {
    if (usuario) {
      setCorreo(usuario.correo || "");
      setNumeroTelefono(usuario.numero_telefono || "");
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioActualizado = {
      id: usuario.id,
      correo,
      numero_telefono: numeroTelefono,
    };


    const validacion = validatePartialUsuario(usuarioActualizado);
    if (!validacion.success) {
      notificarErroresZod(validacion.error);
      return;
    }


    if (
      correo === usuario.correo &&
      numeroTelefono === usuario.numero_telefono
    ) {
      notificarError("No hiciste ningún cambio.");
      return;
    }


    try {
      const usuarios = await obtenerUsuarios();
      const correoDuplicado = usuarios.find(
        (u) => u.correo === correo && u.id !== usuario.id
      );

      if (correoDuplicado) {
        notificarError("Este correo ya está en uso por otro usuario.");
        return;
      }


      await actualizarUsuario(usuarioActualizado);
      console.log("Usuario a actualizar:", usuarioActualizado);
      notificarExito("Usuario actualizado correctamente");
      onActualizar?.(usuarioActualizado);
      onClose();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      notificarError("No se pudo actualizar el usuario");
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Editar Usuario">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Input
            className="pl-4"
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            className="pl-4"
            name="numeroTelefono"
            type="text"
            placeholder="Número de teléfono"
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

export default ModalEditarUsuario;
