import { useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Switch from "@common/ui/Switch";
import Button from "@common/ui/Button";
import { crearUsuario } from "@services/usuarioService";

const ModalAgregarUsuario = ({ isOpen, onClose, onSubmit }) => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState(true);

  const resetCampos = () => {
    setDni("");
    setNombre("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setCorreo("");
    setNumero("");
    setEstado(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoUsuario = await crearUsuario({
        dni,
        nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        correo,
        numero_telefono: numero,
      });

      onSubmit?.(nuevoUsuario); // envía el nuevo usuario al padre si es necesario
      onClose();
      resetCampos(); // cierra el modal
    } catch {
      alert("Error al crear usuario");
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar usuario">
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Switch estado={estado} setEstado={setEstado} />

        <Button type="submit">Agregar Usuario</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarUsuario;
