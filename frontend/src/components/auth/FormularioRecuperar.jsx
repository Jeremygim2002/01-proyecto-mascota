import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Button from "../common/forms/Button";
import Input from "../common/forms/Input";
import Title from "../common/Titulo";

const FormularioRecuperar = ({ onVolver }) => {
  const [correo, setCorreo] = useState("");

  const manejarBuscarCuenta = async (e) => {
    e.preventDefault();

    const data = { correo };
    console.log("Correo para recuperación:", data);

    if (correo) {
      alert("Si el correo existe, recibirás instrucciones.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-superficie p-10 rounded-2xl shadow-2xl w-full max-w-md border border-superficie-borde"
    >
      <Title text="RECUPERA TU CUENTA" className="text-center mb-4" />
      <p className="text-center text-sm text-texto-secundario mb-6">
        Ingresa tu correo electrónico para buscar tu cuenta.
      </p>

      <form onSubmit={manejarBuscarCuenta} className="space-y-6">
        <div>
          <label htmlFor="correo" className="text-sm text-texto block mb-2 font-cuerpo">
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

        <div className="flex justify-between gap-4 mt-6">
          <Button
            type="button"
            className="w-full bg-slate-600"
            onClick={onVolver}
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-full">
            Buscar
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default FormularioRecuperar;
