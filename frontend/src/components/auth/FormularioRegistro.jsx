import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, IdCard } from "lucide-react";
import Button from "../common/forms/Button";
import Input from "../common/forms/Input";
import Title from "../common/Titulo";
import { register } from "../../services/authService"; // nuevo

const FormularioRegistro = ({ onVolver }) => {
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const manejarRegistro = async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombres,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      numero_telefono: telefono,
      correo,
      dni,
      password,
    };

    try {
      await register(data);
      alert("Registro exitoso, ahora inicia sesión");
      onVolver(); // vuelve al login
    } catch (error) {
      console.error("Error al registrar:", error);
      alert(error.error || "Error desconocido");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-superficie p-10 rounded-2xl shadow-2xl w-full max-w-md border border-superficie-borde"
    >
      <Title text="CREA UNA CUENTA" className="text-center mb-4" />
      <p className="text-center text-sm text-texto-secundario mb-6">
        Es rápido y fácil.
      </p>

      <form onSubmit={manejarRegistro} className="space-y-5">
        <div className="relative">
          <label htmlFor="nombres" className="sr-only">
            Nombres
          </label>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <User size={18} />
          </span>
          <Input
            id="nombres"
            name="nombres"
            type="text"
            placeholder="Nombres"
            className="pl-12 w-full py-2"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="apellidoPaterno" className="sr-only">
              Apellido paterno
            </label>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
              <User size={18} />
            </span>
            <Input
              id="apellidoPaterno"
              name="apellidoPaterno"
              placeholder="Apellido paterno"
              className="pl-12 w-full py-2"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="apellidoMaterno" className="sr-only">
              Apellido materno
            </label>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
              <User size={18} />
            </span>
            <Input
              id="apellidoMaterno"
              name="apellidoMaterno"
              placeholder="Apellido materno"
              className="pl-12 w-full py-2"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="dni" className="sr-only">
            DNI
          </label>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <IdCard size={18} />
          </span>
          <Input
            id="dni"
            name="dni"
            type="text"
            placeholder="DNI"
            className="pl-12 w-full py-2"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="telefono" className="sr-only">
            Teléfono
          </label>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <Phone size={18} />
          </span>
          <Input
            id="telefono"
            name="telefono"
            type="text"
            placeholder="Teléfono"
            className="pl-12 w-full py-2"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="correo" className="sr-only">
            Correo electrónico
          </label>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <Mail size={18} />
          </span>
          <Input
            id="correo"
            name="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            className="pl-12 w-full py-2"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
            <Lock size={18} />
          </span>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="pl-12 w-full py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Registrarte
        </Button>

        <p className="text-center text-sm mt-4 text-texto-secundario">
          ¿Ya tienes una cuenta?{" "}
          <button onClick={onVolver} className="text-primary hover:underline">
            Inicia sesión
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default FormularioRegistro;
