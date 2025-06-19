import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";
import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";
import { actualizarUsuario } from "@services/usuarioService";
import { validatePartialUsuario } from "@schemas/usuarioSchema";

const ModalEditarUsuario = ({ isOpen, onClose, usuario, onActualizar }) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [dni, setDni] = useState("");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setApellidoPaterno(usuario.apellido_paterno || "");
      setApellidoMaterno(usuario.apellido_materno || "");
      setCorreo(usuario.correo || "");
      setNumeroTelefono(usuario.numero_telefono || "");
      setDni(usuario.dni || "");
      console.log(usuario);
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioActualizado = {
      id: usuario.id,
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      correo,
      numero_telefono: numeroTelefono,
      dni,
    };

    const validacion = validatePartialUsuario(usuarioActualizado);
    if (!validacion.success) {
      notificarErroresZod(validacion.error);
      return;
    }

    try {
      await actualizarUsuario(usuarioActualizado);
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
            name="nombre"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            className="pl-4"
            name="apellidoPaterno"
            type="text"
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
          <Input
            className="pl-4"
            name="apellidoMaterno"
            type="text"
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
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
          <Input
            className="pl-4"
            name="dni"
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
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
