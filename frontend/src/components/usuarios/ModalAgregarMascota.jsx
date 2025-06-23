import { useState, useEffect } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Button from "@common/ui/Button";
import Select from "@common/ui/Select";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import { buscarUsuarioPorDni } from "@services/usuarioService";
import { obtenerTiposMascota } from "@services/tipoMascotaService";
import { useResetFormulario } from "@hooks/filtros/useResetFormulario";
import { validateMascota } from "@schemas/mascotaSchema";

import {
  notificarError,
  notificarExito,
  notificarUsuarioInvalido,
  notificarErroresZod,
} from "@lib/notificaciones";

const ModalAgregarMascota = ({
  isOpen,
  onClose,
  onSubmit,
  onAbrirModalUsuario,
}) => {
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
  const [idTipoMascota, setIdTipoMascota] = useState("");
  const [tiposMascota, setTiposMascota] = useState([]);

  useEffect(() => {
    const cargarTiposMascota = async () => {
      try {
        const data = await obtenerTiposMascota();
        setTiposMascota(data);
      } catch (error) {
        console.error("Error cargando tipos de mascota:", error);
      }
    };

    if (isOpen) cargarTiposMascota();
  }, [isOpen]);

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
      id_tipo_mascota: parseInt(idTipoMascota),
    };

    try {
      const validacion = validateMascota(nuevaMascota);
      if (!validacion.success) {
        notificarErroresZod(validacion.error);
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
    setLecturaUsuario(true);
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
            <Select
              name="tipo_mascota"
              value={idTipoMascota}
              onChange={(e) => setIdTipoMascota(e.target.value)}
              className="col-span-2"
              required
            >
              <option value="">Tipo de mascota</option>
              {tiposMascota.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </Select>
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
            <Button
              type="button"
              onClick={() => {
                resetCampos();
                setLecturaUsuario(false); // 🔓 Desbloquea campos
                onAbrirModalUsuario(true);
              }}
            >
              Agregar Usuario
            </Button>
            <Button type="submit">Agregar Mascota</Button>
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
