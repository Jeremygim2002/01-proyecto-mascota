import { useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";
import { crearUsuario } from "@services/usuarioService";
import { useResetFormulario } from "@hooks/filtros/useResetFormulario";
import { validateUsuario } from "@schemas/usuarioSchema";
import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";

const ModalAgregarUsuario = ({ isOpen, onClose, onSubmit }) => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState("");

  const resetCampos = useResetFormulario(
    [
      setDni,
      setNombre,
      setApellidoPaterno,
      setApellidoMaterno,
      setCorreo,
      setNumero,
    ],
    ["", "", "", "", "", ""]
  );

  const manejarRegistroUsuario = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      dni,
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      correo,
      numero_telefono: numero,
    };

    const validacion = validateUsuario(nuevoUsuario);
    if (!validacion.success) {
      notificarErroresZod(validacion.error); 
      return;
    }

    try {
      const usuarioCreado = await crearUsuario(nuevoUsuario);
      notificarExito("Usuario registrado correctamente");

      onSubmit?.(usuarioCreado);
      resetCampos();
      onClose();
    } catch (error) {
      console.error("Error al crear usuario:", error);

      if (error.message.includes("Ya existe")) {
        notificarError("Ya hay un usuario registrado con ese correo o DNI");
      } else {
        notificarError("Ocurrió un error inesperado al registrar el usuario");
      }
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar usuario">
      <form onSubmit={manejarRegistroUsuario} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Input
            className="col-span-2 pl-4"
            type="text"
            placeholder="Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <Input
            className="col-span-1 pl-4"
            name="nombre"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            className="col-span-1 pl-4"
            name="apellidoPaterno"
            type="text"
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
          <Input
            className="col-span-1 pl-4"
            name="apellidoMaterno"
            type="text"
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
          <Input
            className="col-span-1 pl-4"
            name="correo"
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="numero"
            type="number"
            placeholder="Número de teléfono"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>

        <Button type="submit">Agregar Usuario</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarUsuario;
