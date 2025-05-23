import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import Button from "../common/forms/Button";
import Input from "../common/forms/Input";
import Title from "../common/Titulo";

const FormularioLogin = () => {
  const navigate = useNavigate();

  const manejarLogin = (e) => {
    e.preventDefault();
    navigate("/servicios");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-superficie p-10 rounded-2xl shadow-2xl w-full max-w-md border border-superficie-borde"
    >
      <Title className="text-center tracking-wide mb-4" text="INICIAR SESIÓNN" />

      <form onSubmit={manejarLogin} className="space-y-6">
        <div>
          <label className="text-sm text-texto block mb-2 font-cuerpo">
            Correo electrónico
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
              <Mail size={18} />
            </span>
            <Input
              type="email"
              placeholder="correo@ejemplo.com"
              className="pl-12 w-full py-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-texto block mb-2 font-cuerpo">Contraseña</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario">
              <Lock size={18} />
            </span>
            <Input
              type="password"
              placeholder="********"
              className="pl-12 w-full py-2"
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6 transition duration-300">
          Iniciar Sesión
        </Button>
      </form>
    </motion.div>
  );
};

export default FormularioLogin;
