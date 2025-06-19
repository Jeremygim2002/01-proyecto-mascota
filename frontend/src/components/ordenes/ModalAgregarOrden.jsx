import { useState, useEffect } from "react";

import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";

import { buscarUsuarioConMascotasPorDni } from "@services/usuarioService";
import { obtenerCategorias } from "@services/categoriaServicioService";
import { obtenerServiciosPorCategoria } from "@services/servicioService";
import { obtenerVeterinariosPorCategoria } from "@services/veterinarioService";

import {
  notificarError,
  notificarExito,
  notificarErroresZod,
  notificarUsuarioInvalido,
} from "@lib/notificaciones";
import useLogin from "@hooks/useLogin";

import { validateOrden } from "@schemas/ordenSchema";
import { confirmarAccion } from "@lib/confirmaciones.jsx";

const ModalAgregarOrden = ({ isOpen, onClose, onSubmit }) => {
  const [dni, setDni] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [idMascota, setIdMascota] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");

  const [servicios, setServicios] = useState([]);
  const [idServicio, setIdServicio] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [precio, setPrecio] = useState(0);

  const [veterinarios, setVeterinarios] = useState([]);
  const [idVeterinario, setIdVeterinario] = useState("");

  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const { usuario: asistente } = useLogin();
  useEffect(() => {
    if (horaInicio && duracion) {
      const [h, m] = horaInicio.split(":").map(Number);
      const endDate = new Date(0, 0, 0, h, m + duracion);
      const endTime = endDate.toTimeString().slice(0, 5);
      setHoraFin(endTime);
    }
  }, [horaInicio, duracion]);

  const buscarUsuario = async () => {
    try {
      const data = await buscarUsuarioConMascotasPorDni(dni);
      setUsuario(data.usuario);
      setMascotas(data.mascotas);
      if (data.mascotas.length === 0) {
        notificarUsuarioInvalido("Este usuario no tiene mascotas registradas");
      }
      notificarExito("Usuario encontrado");
    } catch {
      notificarError("No se encontró usuario con ese DNI");
    }
  };

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch {
        notificarError("Error al cargar categorías");
      }
    };
    if (isOpen) cargarCategorias();
  }, [isOpen]);

  useEffect(() => {
    const cargarServicios = async () => {
      if (!idCategoria) return;
      const data = await obtenerServiciosPorCategoria(idCategoria);
      setServicios(data);
    };
    cargarServicios();
  }, [idCategoria]);

  useEffect(() => {
    if (!idServicio || typeof idServicio !== "string") return;

    const servicio = servicios.find(
      (s) => String(s.id_servicio) === String(idServicio)
    );

    if (servicio) {
      setDuracion(servicio.duracion);
      setPrecio(servicio.precio);
    } else {
      setDuracion(0);
      setPrecio(0);
    }
  }, [idServicio, servicios]);

  useEffect(() => {
    const cargarVeterinarios = async () => {
      if (!idCategoria) return;
      const data = await obtenerVeterinariosPorCategoria(idCategoria);
      setVeterinarios(data);
    };
    cargarVeterinarios();
  }, [idCategoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaOrden = {
      id_mascota: idMascota,
      id_veterinario: idVeterinario,
      id_asistente: asistente?.id,
      servicios: [idServicio],
      fecha,
      hora_inicio: horaInicio,
      estado: true,
    };

    try {
      const validacion = validateOrden(nuevaOrden);
      if (!validacion.success) {
        notificarErroresZod(validacion.error);
        return;
      }

      await onSubmit(validacion.data);
      notificarExito("Orden registrada correctamente");
      onClose();
    } catch (error) {
      console.error("Error al registrar orden:", error);
      notificarError(error);
    }
  };

  const limpiarCampos = () => {
    setDni("");
    setUsuario(null);
    setMascotas([]);
    setIdMascota("");
    setIdCategoria("");
    setServicios([]);
    setIdServicio("");
    setDuracion(0);
    setPrecio(0);
    setVeterinarios([]);
    setIdVeterinario("");
    setFecha("");
    setHoraInicio("");
    setHoraFin("");
  };

  const handleClose = () => {
    if (idMascota || idServicio || fecha || horaInicio) {
      confirmarAccion({
        mensaje: "¿Cerrar sin guardar esta orden?",
        onConfirm: () => {
          limpiarCampos();
          onClose();
        },
      });
      return;
    }

    limpiarCampos();
    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={handleClose} title="Agregar Orden">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="col-span-4 flex gap-4">
            <Input
              className="pl-4 flex-1"
              type="text"
              placeholder="DNI del usuario"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <Button type="button" onClick={buscarUsuario}>
              Buscar
            </Button>
          </div>

          <Input
            className="col-span-2 pl-4"
            type="text"
            label="Nombre del usuario"
            value={
              usuario
                ? `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`
                : ""
            }
            disabled
          />

          <Select
            className="col-span-2"
            value={idMascota}
            onChange={(e) => setIdMascota(e.target.value)}
          >
            <option value="">Selecciona Mascota</option>
            {mascotas.length === 0 ? (
              <option disabled value="">
                Este usuario no tiene mascotas registradas
              </option>
            ) : (
              mascotas.map((m) => (
                <option key={m.id_mascota} value={m.id_mascota}>
                  {m.nombre_mascota}
                </option>
              ))
            )}
          </Select>
          {usuario && mascotas.length === 0 && (
            <p className="col-span-4 text-sm text-red-500 pl-4">
              Este usuario no tiene mascotas registradas.
            </p>
          )}

          <Select
            className="col-span-2"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="">Selecciona Categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Select>

          <Select
            className="col-span-2"
            value={idServicio}
            onChange={(e) => setIdServicio(e.target.value)}
          >
            <option value="">Selecciona Servicio</option>
            {servicios.length === 0 ? (
              <option disabled value="">
                No hay servicios disponibles
              </option>
            ) : (
              servicios.map((s) => (
                <option key={s.id_servicio} value={s.id_servicio}>
                  {s.nombre}
                </option>
              ))
            )}
          </Select>

          <Input
            className="col-span-2 pl-4"
            type="text"
            value={duracion + " min"}
            readOnly
          />

          <Input
            className="col-span-2 pl-4"
            type="text"
            value={`S/. ${precio}`}
            readOnly
          />

          <Select
            className="col-span-2"
            value={idVeterinario}
            onChange={(e) => setIdVeterinario(e.target.value)}
          >
            <option value="">Selecciona Veterinario</option>
            {veterinarios.length === 0 ? (
              <option disabled value="">
                No hay veterinarios disponibles
              </option>
            ) : (
              veterinarios.map((v) => (
                <option key={v.id_veterinario} value={v.id_veterinario}>
                  {v.nombre}
                </option>
              ))
            )}
          </Select>

          <Input
            className="col-span-2 pl-4"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            type="text"
            value={horaFin}
            readOnly
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Crear Orden</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalAgregarOrden;
