import { useEffect, useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Button from "@common/ui/Button";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import useLogin from "@hooks/useLogin";
import { obtenerVeterinariosPorCategoria } from "@services/veterinarioService";

const ModalEditarOrden = ({ isOpen, onClose, onSubmit, orden }) => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [idVeterinario, setIdVeterinario] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const { usuario: asistente } = useLogin();

  useEffect(() => {
    if (orden) {
      const fechaOrden = orden.fecha?.split("T")[0] || "";
      const horaInicioOrden = orden.hora_inicio?.slice(0, 5) || "";

      setIdVeterinario(orden.id_veterinario || "");
      setFecha(fechaOrden);
      setHoraInicio(horaInicioOrden);
    }
  }, [orden]);

  useEffect(() => {
    const cargarVeterinarios = async () => {
      if (!orden?.id_categoria) return;
      try {
        const data = await obtenerVeterinariosPorCategoria(orden.id_categoria);
        setVeterinarios(data);
      } catch (err) {
        console.error("Error al cargar veterinarios:", err);
        setVeterinarios([]);
      }
    };
    if (isOpen && orden?.id_categoria) cargarVeterinarios();
  }, [isOpen, orden?.id_categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fixTimeFormat = (timeStr) => timeStr?.slice(0, 5);

    await onSubmit({
      id_orden: orden.id_orden,
      id_asistente: asistente?.id,
      id_veterinario: idVeterinario,
      id_mascota: orden.id_mascota,
      fecha,
      hora_inicio: fixTimeFormat(horaInicio),
      estado: Boolean(orden.estado),
    });

    onClose();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Editar Orden">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            name="veterinario"
            value={idVeterinario}
            onChange={(e) => setIdVeterinario(e.target.value)}
            required
          >
            <option value="">Selecciona veterinario</option>
            {veterinarios.map((vet) => (
              <option key={vet.id_veterinario} value={vet.id_veterinario}>
                {vet.nombre}
              </option>
            ))}
          </Select>

          <Input
            className="pl-4"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <Input
            className="pl-4"
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
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
