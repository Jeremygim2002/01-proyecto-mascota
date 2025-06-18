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
  const [horaFin, setHoraFin] = useState("");

  const calcularHoraFin = (horaInicio, duracionMin) => {
    if (!horaInicio || !duracionMin) return "";
    const [h, m] = horaInicio.split(":").map(Number);
    const inicio = new Date(0, 0, 0, h, m);
    inicio.setMinutes(inicio.getMinutes() + parseInt(duracionMin));
    return inicio.toTimeString().slice(0, 5);
  };

  const buscarUsuario = async () => {
    try {
      const res = await buscarUsuarioConMascotasPorDni(dniDuenio);
      console.log("RES: ", res);
      setUsuario(res.usuario);
      setMascotas(res.mascotas);
    } catch (e) {
      console.error(e);
      setUsuario(null);
      setMascotas([]);
      alert("Usuario no encontrado");
    }
  };

  const handleMascotaChange = (id) => {
    setMascotaSeleccionada(id);
    const mascota = mascotas.find((m) => m.id_mascota === id);
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
    console.log("🆔 ID seleccionado:", id);
    console.log("📦 Servicios disponibles:", servicios);

    const servicio = servicios.find(
      (s) => String(s.id_servicio) === String(id)
    );
    console.log("🔍 Servicio encontrado:", servicio);

    if (servicio) {
      setPrecio(servicio.precio);
      setDuracion(servicio.duracion);
      if (hora) setHoraFin(calcularHoraFin(hora, servicio.duracion));
    } else {
      setPrecio("");
      setDuracion("");
      setHoraFin("");
    }
  };

  const handleVeterinarioChange = (id) => {
    setVeterinarioSeleccionado(id);
    const v = veterinarios.find((v) => v.id === id);
    if (v) setDniVeterinario(v.dni);
  };

  const handleHoraChange = (h) => {
    setHora(h);
    if (duracion) setHoraFin(calcularHoraFin(h, duracion));
  };

  useEffect(() => {
    const cargarCategorias = async () => {
      const cat = await obtenerCategorias();
      console.log("Categorias:", cat); 
      setCategorias(cat);
    };
    cargarCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaOrden = {
      id_mascota: mascotaSeleccionada,
      id_veterinario: veterinarioSeleccionado,
      id_asistente: "ID_ASISTENTE_FIXME",
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
          <div className="col-span-4 flex gap-4">
            <Input
              className="pl-4 flex-1"
              name="dniDuenio"
              placeholder="DNI del dueño"
              value={dniDuenio}
              onChange={(e) => setDniDuenio(e.target.value)}
            />
            <Button
              type="button"
              className="col-span-2"
              onClick={buscarUsuario}
            >
              Buscar
            </Button>
          </div>
          <Input
            className="col-span-2 pl-4"
            disabled
            value={
              usuario ? `${usuario.nombre} ${usuario.apellido_paterno}` : ""
            }
            placeholder="Nombre del dueño"
          />

          <Select
            className="col-span-2"
            name="mascota"
            value={mascotaSeleccionada}
            onChange={(e) => handleMascotaChange(e.target.value)}
          >
            <option key="_info_mascota_" value="">
              Seleccione mascota
            </option>
            {mascotas.map((m, i) => (
              <option key={`mascota_${m.id_mascota ?? i}`} value={m.id_mascota}>
                {m.nombre_mascota}
              </option>
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
            className="col-span-2"
            name="categoria"
            value={categoriaSeleccionada}
            onChange={(e) => handleCategoriaChange(e.target.value)}
          >
            <option key="_info_categoria_" value="">
              Seleccione categoría
            </option>
            {categorias.map((c, i) => (
              <option key={`cat_${c.id ?? i}`} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Select>

          <Select
            className="col-span-2"
            name="servicio"
            value={servicioSeleccionado}
            onChange={(e) => {
              const val = e.target.value;
              console.log("🎯 Valor seleccionado en select servicio:", val);
              handleServicioChange(val);
            }}
          >
            <option key="_info_servicio_" value="">
              Seleccione servicio
            </option>
            {servicios.map((s, i) => (
              <option
                key={`serv_${s.id_servicio ?? i}`}
                value={String(s.id_servicio)} // Asegura string
              >
                {s.nombre}
              </option>
            ))}
          </Select>

          <Input
            className="col-span-2"
            disabled
            value={`S/. ${precio}`}
            placeholder="Precio"
          />
          <Input
            className="col-span-2"
            disabled
            value={`${duracion} min`}
            placeholder="Duración"
          />
          <Select
            className="col-span-2"
            name="veterinario"
            value={veterinarioSeleccionado}
            onChange={(e) => handleVeterinarioChange(e.target.value)}
          >
            <option key="_info_vet_" value="">
              Seleccione veterinario
            </option>
            {veterinarios.map((v, i) => (
              <option key={`vet_${v.id ?? i}`} value={v.id}>
                {v.nombre_completo}
              </option>
            ))}
          </Select>

          <Input
            className="col-span-2"
            disabled
            value={dniVeterinario}
            placeholder="DNI Veterinario"
          />
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
            onChange={(e) => handleHoraChange(e.target.value)}
            required
          />
          <Input
            className="col-span-2"
            disabled
            value={horaFin}
            placeholder="Hora Fin"
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
