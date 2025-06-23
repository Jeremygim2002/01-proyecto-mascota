import useLogin from "@hooks/useLogin";
import { useState, useEffect } from "react";

import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";

import useUsuarioConMascotas from "@hooks/ordenes/useUsuariosConMascotas";
import useServiciosCategoria from "@hooks/ordenes/useServiciosCategoria";
import useVeterinariosPorCategoria from "@hooks/ordenes/useVeterinariosPorCategoria";

import { obtenerCategorias } from "@services/categoriaServicioService";

import {
  notificarError,
  notificarExito,
  notificarErroresZod,
} from "@lib/notificaciones";

import { validateOrden } from "@schemas/ordenSchema";
import { confirmarAccion } from "@lib/confirmaciones.jsx";

const ModalAgregarOrden = ({ isOpen, onClose, onSubmit }) => {
  const [dni, setDni] = useState("");
  const [idMascota, setIdMascota] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [idServicio, setIdServicio] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [idVeterinario, setIdVeterinario] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [categorias, setCategorias] = useState([]);

  const { usuario: asistente } = useLogin();
  const { usuario, mascotas, buscarPorDni } = useUsuarioConMascotas();
  const servicios = useServiciosCategoria(idCategoria);
  const veterinarios = useVeterinariosPorCategoria(idCategoria);

  useEffect(() => {
    if (horaInicio && duracion) {
      const [h, m] = horaInicio.split(":").map(Number);
      const endDate = new Date(0, 0, 0, h, m + duracion);
      const endTime = endDate.toTimeString().slice(0, 5);
      setHoraFin(endTime);
    }
  }, [horaInicio, duracion]);

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
    setIdMascota("");
    setIdCategoria("");
    setIdServicio("");
    setDuracion(0);
    setPrecio(0);
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
            <Button type="button" onClick={() => buscarPorDni(dni)}>
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
              mascotas
                .filter((m) => m.estado) // solo muestra las activas
                .map((m) => (
                  <option key={m.id_mascota} value={m.id_mascota}>
                    {m.nombre_mascota}
                  </option>
                ))
            )}
          </Select>

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
            {servicios.length > 0 && idCategoria
              ? servicios.map((s) => (
                  <option key={s.id_servicio} value={s.id_servicio}>
                    {s.nombre}
                  </option>
                ))
              : null}
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
            {veterinarios.length > 0 && idCategoria
              ? veterinarios.map((v) => (
                  <option key={v.id_veterinario} value={v.id_veterinario}>
                    {v.nombre}
                  </option>
                ))
              : null}
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
