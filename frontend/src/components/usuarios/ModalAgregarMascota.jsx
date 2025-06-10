import { useState } from "react";
import ModalGeneral from "@common/modals/ModalGeneral";
import Input from "@common/ui/Input";
import Switch from "@common/ui/Switch";
import Button from "@common/ui/Button";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import { buscarUsuarioPorDni } from "@services/usuarioService";


const ModalAgregarMascota = ({ isOpen, onClose, onSubmit,  onAbrirUsuario }) => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [razaMascota, setRazaMascota] = useState("");
  const [edadMascota, setEdadMascota] = useState("");
  const [sexo, setSexo] = useState("");
  const [estado, setEstado] = useState(true);
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [idUsuario, setIdUsuario] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!idUsuario) {
    alert("Debes buscar un usuario válido antes de agregar la mascota.");
    return;
  }

  const nuevaMascota = {
    nombre: nombreMascota,
    raza: razaMascota,
    edad: Number(edadMascota),
    sexo,
    estado,
    id_usuario: idUsuario,
  };

  try {
    await onSubmit(nuevaMascota); // 🔁 Llama al padre, ahí se crea y recarga
    alert("Mascota creada correctamente");
    resetCampos();
    onClose();
  } catch (error) {
    console.error("Error al crear mascota:", error);
    alert("Error al crear la mascota");
  }
};

  const buscarPorDni = async () => {
    if (!dni) return;

    const usuario = await buscarUsuarioPorDni(dni);
    if (!usuario) {
      // 🔁 Limpiar campos si no encuentra usuario
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setCorreo("");
      setNumero("");
      alert("Usuario no encontrado");
      return;
    }

    // ✅ Si encuentra, rellenar normalmente
    setIdUsuario(usuario.id); // ✅ Guardamos el id
    setNombre(usuario.nombre);
    setApellidoPaterno(usuario.apellido_paterno);
    setApellidoMaterno(usuario.apellido_materno);
    setCorreo(usuario.correo);
    setNumero(usuario.numero_telefono);
  };

  const resetCampos = () => {
    setDni("");
    setNombre("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setCorreo("");
    setNumero("");
    setNombreMascota("");
    setRazaMascota("");
    setEdadMascota("");
    setSexo("");
    setEstado(true);
  };

  return (
    <>
      <ModalGeneral isOpen={isOpen} onClose={onClose} title="Agregar mascota">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
            <Input
              className="col-span-2 pl-4"
              name="apellidoPaterno"
              type="text"
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />
            <Input
              className="col-span-2 pl-4"
              name="apellidoMaterno"
              type="text"
              placeholder="Apellido Materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
            />
            <Input
              className="col-span-2 pl-4"
              name="correo"
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <Input
              className="col-span-2 pl-4"
              name="numero"
              type="number"
              placeholder="Numero de telefono"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
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
              placeholder="Edad Mascota"
              value={edadMascota}
              onChange={(e) => setEdadMascota(e.target.value)}
            />
            <Input
              className="col-span-2 pl-4"
              name="sexo"
              type="text"
              placeholder="Sexo Mascota"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
            />
          </div>

          <Switch estado={estado} setEstado={setEstado} />

          <div className="flex justify-between">
            <Button type="submit">Agregar Mascota</Button>
            <Button
              type="button"
              onClick={() => {
                resetCampos();
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
      />
    </>
  );
};

export default ModalAgregarMascota;
