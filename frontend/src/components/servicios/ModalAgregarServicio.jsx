import { useState } from "react";
import ModalGeneral from "../common/ModalGeneral";
import Input from "../common/forms/Input";
import Select from "../common/forms/Select";
import Switch from "../common/forms/Switch";
import Button from "../common/forms/Button";

const ModalAgregarServicio = ({ isOpen, onClose, onSubmit }) => {
  const [categoria, setCategoria] = useState("baños");
  const [tipo, setTipo] = useState("corte");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ descripcion, duracion });
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar servicio">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Select
            className="col-span-2"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="categoria">categoria</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
          </Select>

          <Select
            className="col-span-2"
            name="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="tipo">tipo</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
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
            placeholder="Duración"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="precio"
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        {/* Toggle de estado */}

        <Switch estado={estado} setEstado={setEstado} />
        <Button>Guardar</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarServicio;
