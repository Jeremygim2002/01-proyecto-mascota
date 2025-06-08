import { useState } from "react";
import ModalGeneral from "../common/ModalGeneral";
import Input from "../common/forms/Input";
import Select from "../common/forms/Select";
import Switch from "../common/forms/Switch"
import Button from "../common/forms/Button"

const ModalAgregarUsuario = ({ isOpen, onClose, onSubmit }) => {
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
    onSubmit({ nombre, correo, rol, estado });
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar usuario">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Input
            className="col-span-4 pl-4"
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="apellidoPaterno"
            type="text"
            placeholder="Apellido Paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="apellidoMaterno"
            type="text"
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
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
            placeholder="Numero de telefono"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            type="text"
            placeholder="Dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="nombreMascota"
            type="text"
            placeholder="Nombre Mascota"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="razaMascota"
            type="text"
            placeholder="Raza Mascota"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="edadMascota"
            type="number"
            placeholder="Edad Mascota"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <Select
            className="col-span-2 pl-4"
            name="categoria"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="administrador">Sexo</option>
            <option value="veterinario">M</option>
            <option value="recepcionista">F</option>
          </Select>
        </div>

        <Switch estado={estado} setEstado={setEstado} />

        <Button>Agregar</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarUsuario;
