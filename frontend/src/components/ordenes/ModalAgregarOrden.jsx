import { useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Button from "@common/ui/Button";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Switch from "@common/ui/Switch";

const ModalAgregarOrden = ({ isOpen, onClose, onSubmit }) => {
  const [dniDuenio, setDniDuenio] = useState("");

  const [nombreDuenio, setNombreDuenio] = useState("");

  const [nombreMascota, setNombreMascota] = useState("");

  const [razaMascota, setRazaMascota] = useState("");

  const [edadMascota, setEdadMascota] = useState("");

  const [categoria, setCategoria] = useState("");

  const [tipoCategoria, setTipoCategoria] = useState("");

  const [precio, setPrecio] = useState("");

  const [duracion, setDuracion] = useState("");

  const [nombreVeterinario, setNombreVeterinario] = useState("");

  const [dniVeterinario, setDniVeterinario] = useState("");

  const [rolveterinario, setRolVeterinario] = useState("");

  const [estado, setEstado] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      dniDuenio,
      nombreDuenio,
      nombreMascota,
      razaMascota,
      edadMascota,
      categoria,
      tipoCategoria,
      precio,
      duracion,
      nombreVeterinario,
      dniVeterinario,
      rolveterinario,
    });
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar orden">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Input
            className="col-span-2 pl-4"
            name="dniDuenio"
            type="text"
            placeholder="Dni del dueño"
            value={dniDuenio}
            onChange={(e) => setDniDuenio(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="nombreDuenio"
            type="text"
            placeholder="Nombre del dueño"
            value={nombreDuenio}
            onChange={(e) => setNombreDuenio(e.target.value)}
          />

          <Select
            className="col-span-4 "
            name="nombreMascota"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
          >
            <option value="administrador">Nombre de la mascota</option>
            <option value="administrador">Administrador</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
          </Select>

          <Input
            className="col-span-2 pl-4"
            name="razaMascota"
            type="text"
            placeholder="Raza de la mascota"
            value={razaMascota}
            onChange={(e) => setRazaMascota(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            name="edadMascota"
            type="text"
            placeholder="Edad de la mascota"
            value={edadMascota}
            onChange={(e) => setEdadMascota(e.target.value)}
          />

          <Select
            className="col-span-2 pl-4"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="administrador">Categoria</option>
            <option value="administrador">Administrador</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
          </Select>

          <Select
            className="col-span-2"
            name="tipoCategoria"
            value={tipoCategoria}
            onChange={(e) => setTipoCategoria(e.target.value)}
          >
            <option value="administrador">Tipo Categoria</option>
            <option value="administrador">Administrador</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
          </Select>

          <Input
            className="col-span-2 pl-4"
            name="precio"
            type="text"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            name="duracion"
            type="text"
            placeholder="Duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          />

          <Select
            className="col-span-4"
            name="nombreVeterinario"
            value={nombreVeterinario}
            onChange={(e) => setNombreVeterinario(e.target.value)}
          >
            <option value="administrador">Nombre del veterinario</option>
            <option value="administrador">Administrador</option>
            <option value="veterinario">Veterinario</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="limpieza">Limpieza</option>
          </Select>

          <Input
            className="col-span-2 pl-4"
            name="dniVeterinario"
            type="text"
            placeholder="dni del veterinario"
            value={dniVeterinario}
            onChange={(e) => setDniVeterinario(e.target.value)}
          />

          <Input
            className="col-span-2 pl-4"
            name="rolVeterinario"
            type="text"
            placeholder="rol del veterinario"
            value={rolveterinario}
            onChange={(e) => setRolVeterinario(e.target.value)}
          />
          <Input
            className="col-span-4 pl-4"
            name="rolVeterinario"
            type="date"
            placeholder="rol del veterinario"
            value={rolveterinario}
            onChange={(e) => setRolVeterinario(e.target.value)}
          />
        </div>
        <Switch estado={estado} setEstado={setEstado} />
        <Button>Buscar</Button>
        <Button>Guardar</Button>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarOrden;
