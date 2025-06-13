import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Select from "@common/ui/Select";
import Button from "@common/ui/Button";
import { notificarError, notificarExito } from "@lib/notificaciones";
import { mascotaSchema } from "@schemas/mascotaSchema";

const ModalEditarMascotaUsuario = ({ isOpen, onClose, mascota, onActualizar }) => {
  const [nombreMascota, setNombreMascota] = useState("");
  const [razaMascota, setRazaMascota] = useState("");
  const [edadMascota, setEdadMascota] = useState("");
  const [sexo, setSexo] = useState("");

  useEffect(() => {
    if (mascota) {
      setNombreMascota(mascota.nombre_mascota || "");
      setRazaMascota(mascota.raza || "");
      setEdadMascota(mascota.edad || "");
      setSexo(mascota.sexo || "");
    }
  }, [mascota]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mascotaEditada = {
      id: mascota.id_mascota,
      nombre: nombreMascota,
      raza: razaMascota,
      edad: Number(edadMascota),
      sexo,
      id_usuario: mascota.id_usuario,
    };

    const validacion = mascotaSchema.safeParse(mascotaEditada);
    if (!validacion.success) {
      const errores = validacion.error.format();
      for (const campo in errores) {
        const mensaje = errores[campo]?._errors?.[0];
        if (mensaje) notificarError(mensaje);
      }
      return;
    }

    try {
      await onActualizar(mascotaEditada);
      notificarExito("Mascota actualizada correctamente");
      onClose();
    } catch (error) {
      console.error("Error actualizando mascota:", error);
      notificarError("No se pudo actualizar la mascota");
    }
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Editar Mascota">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <Input
            className="col-span-2 pl-4"
            name="nombreMascota"
            type="text"
            placeholder="Nombre Mascota"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="razaMascota"
            type="text"
            placeholder="Raza"
            value={razaMascota}
            onChange={(e) => setRazaMascota(e.target.value)}
          />
          <Input
            className="col-span-2 pl-4"
            name="edadMascota"
            type="number"
            placeholder="Edad"
            value={edadMascota}
            onChange={(e) => setEdadMascota(e.target.value)}
          />
          <Select
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="col-span-2"
          >
            <option value="">Seleccionar sexo</option>
            <option value="M">Macho</option>
            <option value="F">Hembra</option>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </ModalGeneral>
  );
};

export default ModalEditarMascotaUsuario;
