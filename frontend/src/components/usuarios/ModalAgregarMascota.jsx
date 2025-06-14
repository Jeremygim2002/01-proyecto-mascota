import { useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";
import Select from "@common/ui/Select";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import { buscarUsuarioPorDni } from "@services/usuarioService";
import { useResetFormulario } from "@hooks/useResetFormulario";
import { mascotaSchema } from "@schemas/mascotaSchema";

import {
  notificarError,
  notificarExito,
  notificarUsuarioInvalido,
} from "@lib/notificaciones";

const ModalAgregarMascota = ({ isOpen, onClose, onSubmit, onAbrirUsuario }) => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [razaMascota, setRazaMascota] = useState("");
  const [edadMascota, setEdadMascota] = useState("");
  const [sexo, setSexo] = useState("");
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [idUsuario, setIdUsuario] = useState("");
  const [lecturaUsuario, setLecturaUsuario] = useState(false);

  const resetCampos = useResetFormulario(
    [
      setDni,
      setNombre,
      setApellidoPaterno,
      setApellidoMaterno,
      setNombreMascota,
      setRazaMascota,
      setEdadMascota,
      setSexo,
    ],
    ["", "", "", "", "", "", "", "", "", ""]
  );

  const manejarRegistroMascota = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      notificarUsuarioInvalido(
        "Debes buscar un usuario válido antes de agregar una mascota."
      );
      return;
    }

    const nuevaMascota = {
      nombre: nombreMascota,
      raza: razaMascota,
      edad: Number(edadMascota),
      sexo,
      estado: true,
      id_usuario: idUsuario,
    };

    try {
      const validacion = mascotaSchema.safeParse(nuevaMascota);
      if (!validacion.success) {
        const errores = validacion.error.format();
        for (const campo in errores) {
          const mensaje = errores[campo]?._errors?.[0];
          if (mensaje) notificarError(mensaje);
        }
        return;
      }

      await onSubmit(nuevaMascota);
      notificarExito("Mascota registrada correctamente.");
      resetCampos();
      onClose();
    } catch (error) {
      console.error("Error al crear mascota:", error);
      notificarError(error);
    }
  };

  const buscarPorDni = async () => {
    if (!dni) return;

    const usuario = await buscarUsuarioPorDni(dni);
    if (!usuario) {
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      notificarError("No se encontró ningún usuario con ese DNI.");
      return;
    }
    notificarExito("Usuario encontrado satisfactoriamente");
    setLecturaUsuario(true); // ✅ Bloquea los campos
    setIdUsuario(usuario.id);
    setNombre(usuario.nombre);
    setApellidoPaterno(usuario.apellido_paterno);
    setApellidoMaterno(usuario.apellido_materno);
  };

  return (
    <>
      <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar mascota">
        <form onSubmit={manejarRegistroMascota} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div className="col-span-4 flex gap-4">
              <Input
                className="pl-4 flex-1"
                type="text"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <Button type="button" onClick={buscarPorDni}>
                Buscar
              </Button>
            </div>
            <Input
              className="col-span-2 pl-4"
              name="nombre"
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={lecturaUsuario}
            />
            <Input
              className="col-span-2 pl-4"
              name="apellidoPaterno"
              type="text"
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
              disabled={lecturaUsuario}
            />
            <Input
              className="col-span-2 pl-4"
              name="apellidoMaterno"
              type="text"
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
              disabled={lecturaUsuario}
            />
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
              placeholder="Raza Mascota"
              value={razaMascota}
              onChange={(e) => setRazaMascota(e.target.value)}
            />
            <Input
              className="col-span-2 pl-4"
              name="edadMascota"
              type="number"
              placeholder="Edad Mascota en años"
              value={edadMascota}
              onChange={(e) => setEdadMascota(e.target.value)}
            />
            <Select
              name="sexo"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="col-span-2"
              required
            >
              <option value="">Seleccionar sexo</option>
              <option value="M">Macho</option>
              <option value="F">Hembra</option>
            </Select>
          </div>

          <div className="flex justify-between">
            <Button type="submit">Agregar Mascota</Button>
            <Button
              type="button"
              onClick={() => {
                resetCampos();
                setLecturaUsuario(false); // 🔓 Desbloquea campos
                onAbrirUsuario(true);
              }}
            >
              Agregar Usuario
            </Button>
          </div>
        </form>
      </ModalGeneral>
      <ModalAgregarUsuario
        isOpen={modalUsuarioOpen}
        onClose={() => setModalUsuarioOpen(false)}
        onSubmit={(usuarioCreado) => {
          setDni(usuarioCreado.dni);
          setNombre(usuarioCreado.nombre);
          setApellidoPaterno(usuarioCreado.apellido_paterno);
          setApellidoMaterno(usuarioCreado.apellido_materno);
          setIdUsuario(usuarioCreado.id);
          setLecturaUsuario(true);
        }}
      />
    </>
  );
};

export default ModalAgregarMascota;
