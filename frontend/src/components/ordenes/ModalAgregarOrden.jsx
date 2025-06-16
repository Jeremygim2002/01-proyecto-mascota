import { useEffect, useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Button from "@common/ui/Button";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";

import { obtenerCategorias } from "@services/categoriaServicioService";
import { obtenerServiciosPorCategoria } from "@services/servicioService";
import { obtenerVeterinariosPorCategoria } from "@services/veterinarioService";
import { buscarUsuarioConMascotasPorDni } from "@services/usuarioService";

const ModalAgregarOrden = ({ isOpen, onClose, onSubmit }) => {
  const [dniDuenio, setDniDuenio] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState("");
  const [razaMascota, setRazaMascota] = useState("");
  const [edadMascota, setEdadMascota] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");

  const [veterinarios, setVeterinarios] = useState([]);
  const [veterinarioSeleccionado, setVeterinarioSeleccionado] = useState("");
  const [dniVeterinario, setDniVeterinario] = useState("");

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const buscarUsuario = async () => {
    try {
      const res = await buscarUsuarioConMascotasPorDni(dniDuenio);
      setUsuario(res.user);
      setMascotas(res.mascotas);
    } catch (error) {
      console.error("Error al buscar usuario:", error);
    }
  };

  const handleMascotaChange = (id) => {
    setMascotaSeleccionada(id);
    const mascota = mascotas.find((m) => m.id === id);
    if (mascota) {
      setRazaMascota(mascota.raza);
      setEdadMascota(mascota.edad);
    }
  };

  const handleCategoriaChange = async (id) => {
    setCategoriaSeleccionada(id);
    const servs = await obtenerServiciosPorCategoria(id);
    setServicios(servs);
    const vets = await obtenerVeterinariosPorCategoria(id);
    setVeterinarios(vets);
  };

  const handleServicioChange = (id) => {
    setServicioSeleccionado(id);
    const s = servicios.find((s) => s.id_servicio === id);
    if (s) {
      setPrecio(s.precio);
      setDuracion(s.duracion);
    }
  };

  const handleVeterinarioChange = (id) => {
    setVeterinarioSeleccionado(id);
    const v = veterinarios.find((v) => v.id === id);
    if (v) setDniVeterinario(v.dni);
  };

  useEffect(() => {
    const cargarCategorias = async () => {
      const cat = await obtenerCategorias();
      setCategorias(cat);
    };
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaOrden = {
      id_mascota: mascotaSeleccionada,
      id_veterinario: veterinarioSeleccionado,
      id_asistente: "ID_ASISTENTE_FIXME", // Reemplazar con auth
      servicios: [servicioSeleccionado],
      fecha,
      hora,
    };
    await onSubmit(nuevaOrden);
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar orden">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Input
            className="col-span-2 pl-4"
            name="dniDuenio"
            placeholder="DNI del dueño"
            value={dniDuenio}
            onChange={(e) => setDniDuenio(e.target.value)}
          />
          <Button type="button" className="col-span-2" onClick={buscarUsuario}>
            Buscar
          </Button>

          <Input
            className="col-span-4"
            disabled
            value={usuario ? `${usuario.nombre} ${usuario.apellido_paterno}` : ""}
            placeholder="Nombre del dueño"
          />

          <Select
            className="col-span-4"
            name="mascota"
            value={mascotaSeleccionada}
            onChange={(e) => handleMascotaChange(e.target.value)}
          >
            <option value="">Seleccione mascota</option>
            {mascotas.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </Select>

          <Input
            className="col-span-2"
            disabled
            value={razaMascota}
            placeholder="Raza"
          />
          <Input
            className="col-span-2"
            disabled
            value={edadMascota}
            placeholder="Edad"
          />

          <Select
            className="col-span-4"
            name="categoria"
            value={categoriaSeleccionada}
            onChange={(e) => handleCategoriaChange(e.target.value)}
          >
            <option value="">Seleccione categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </Select>

          <Select
            className="col-span-4"
            name="servicio"
            value={servicioSeleccionado}
            onChange={(e) => handleServicioChange(e.target.value)}
          >
            <option value="">Seleccione servicio</option>
            {servicios.map((s) => (
              <option key={s.id_servicio} value={s.id_servicio}>{s.nombre}</option>
            ))}
          </Select>

          <Input className="col-span-2" disabled value={`S/. ${precio}`} placeholder="Precio" />
          <Input className="col-span-2" disabled value={`${duracion} min`} placeholder="Duración" />

          <Select
            className="col-span-4"
            name="veterinario"
            value={veterinarioSeleccionado}
            onChange={(e) => handleVeterinarioChange(e.target.value)}
          >
            <option value="">Seleccione veterinario</option>
            {veterinarios.map((v) => (
              <option key={v.id} value={v.id}>{v.nombre_completo}</option>
            ))}
          </Select>

          <Input className="col-span-2" disabled value={dniVeterinario} placeholder="DNI Veterinario" />

          <Input
            className="col-span-2"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <Input
            className="col-span-2"
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Guardar Orden</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarOrden;
