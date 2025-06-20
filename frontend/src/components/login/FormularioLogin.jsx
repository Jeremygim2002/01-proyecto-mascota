import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificarError, notificarExito } from "@lib/notificaciones";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import Button from "@common/ui/Button";
import Input from "@common/ui/Input";
import Title from "@common/layout/Titulo";
import Loader from "@common/ui/Loader";
import { login } from "@services/loginService";

const FormularioLogin = ({ onOlvidaste, onCrearCuenta }) => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrandoLoader, setMostrandoLoader] = useState(false);

  const manejarLogin = async (e) => {
    e.preventDefault();
    const data = { correo, password };

    try {
      await login(data);
      notificarExito("Inicio de sesión exitoso");
   
      setMostrandoLoader(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); 
    } catch (error) {
      notificarError("correo o contraseña incorrecta");
      console.error("Error al iniciar sesión:", error);
    }
  };

  if (mostrandoLoader) {
    return <Loader duracion={2500} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-superficie p-10 rounded-2xl shadow-2xl w-full max-w-md border border-superficie-borde"
    >
      <Title className="text-center tracking-wide mb-4" text="INICIAR SESIÓN" />

      <form onSubmit={manejarLogin} className="space-y-6">
        {/* Campo correo */}
        <div>
          <label
            htmlFor="correo"
            className="text-sm text-texto block mb-2 font-cuerpo"
          >
            Correo electrónico
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
              <Mail size={18} />
            </span>

            <Input
              id="correo"
              name="correo"
              type="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="pl-12 w-full py-2"
              required
            />
          </div>
        </div>
        {/* Campo contraseña */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-texto block mb-2 font-cuerpo"
          >
            Contraseña
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
              <Lock size={18} />
            </span>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 w-full py-2"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6 transition duration-300">
          Iniciar Sesión
        </Button>

        <p className="text-center text-sm mt-4 text-texto-secundario">
          <button
            type="button"
            onClick={onOlvidaste}
            className="hover:underline text-primary"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

        <p className="text-center text-sm mt-2 text-texto-secundario">
          <button
            type="button"
            onClick={onCrearCuenta}
            className="hover:underline text-primary"
          >
            Crear cuenta nueva
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default FormularioLogin;
