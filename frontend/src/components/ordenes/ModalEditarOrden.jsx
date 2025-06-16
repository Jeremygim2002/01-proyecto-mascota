import { useEffect, useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Button from "@common/ui/Button";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";

import { obtenerCategorias } from "@services/categoriaServicioService";
import { obtenerServiciosPorCategoria } from "@services/servicioService";
import { obtenerVeterinariosPorCategoria } from "@services/veterinarioService";

const ModalEditarOrden = ({ isOpen, onClose, onSubmit, orden }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [veterinarioSeleccionado, setVeterinarioSeleccionado] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    if (orden) {
      setFecha(orden.fecha || "");
      setHora(orden.hora || "");
    }
  }, [orden]);

  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await obtenerCategorias();
      setCategorias(data);
    };
    cargarCategorias();
  }, []);

  useEffect(() => {
    const cargarServicios = async () => {
      if (!categoriaSeleccionada) return;
      const data = await obtenerServiciosPorCategoria(categoriaSeleccionada);
      setServicios(data);
    };
    cargarServicios();
  }, [categoriaSeleccionada]);

  useEffect(() => {
    const cargarVeterinarios = async () => {
      if (!categoriaSeleccionada) return;
      const data = await obtenerVeterinariosPorCategoria(categoriaSeleccionada);
      setVeterinarios(data);
    };
    cargarVeterinarios();
  }, [categoriaSeleccionada]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: orden.id_orden,
      id_mascota: orden.id_mascota,
      id_veterinario: veterinarioSeleccionado || orden.id_veterinario,
      estado: orden.estado, // importante para mantener estado
      id_asistente: orden.id_asistente,
      fecha,
      hora,
    };
    await onSubmit(data);
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Editar Orden">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            name="categoria"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            required
          >
            <option value="">Selecciona categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </Select>

          <Select
            name="servicio"
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
            required
          >
            <option value="">Selecciona servicio</option>
            {servicios.map((serv) => (
              <option key={serv.id_servicio} value={serv.id_servicio}>
                {serv.nombre} - S/.{serv.precio}
              </option>
            ))}
          </Select>

          <Select
            name="veterinario"
            value={veterinarioSeleccionado}
            onChange={(e) => setVeterinarioSeleccionado(e.target.value)}
            required
          >
            <option value="">Selecciona veterinario</option>
            {veterinarios.map((vet) => (
              <option key={vet.id} value={vet.id}>
                {vet.nombre_completo}
              </option>
            ))}
          </Select>

          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
          <Input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalEditarOrden;
