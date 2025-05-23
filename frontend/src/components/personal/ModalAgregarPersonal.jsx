import { useState } from "react";
import ModalGeneral from "../common/ModalGeneral";
import Input from "../common/forms/Input";
import Select from "../common/forms/Select";
import Switch from "../common/forms/Switch";
import Button from "../common/forms/Button";

const ModalAgregarPersonal = ({ isOpen, onClose, onSubmit }) => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState("");
  const [rol, setRol] = useState("veterinario");
  const [estado, setEstado] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      numero,
      dni,
      rol,
      estado,
    });
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar personal">
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
            type="text"
            name="numero"
            id="numero"
            placeholder="Numero de telefono"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            type="text"
            name="dni"
            id="dni"
            placeholder="Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <Select
            className="col-span-2"
            name="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="" disabled>
              Seleccione un rol
            </option>
            <option value="administrador">Rol</option>
            <option value="administrador">Administrador</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
          </Select>
        </div>

        <Switch estado={estado} setEstado={setEstado} />

        <Button>Agregar</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarPersonal;
