import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PinInput, PinInputField } from "@common/ui/pin-input";
import Button from "@common/ui/Button";
import Title from "@common/layout/Titulo";

const FormularioCodigoAdministrador = ({ onExito, onVolver }) => {
  const [codigo, setCodigo] = useState("");
  const CODIGO_VALIDO = "123456"; // <- Aquí puedes cambiar el código secreto

  const verificarCodigo = (e) => {
    e.preventDefault();
    if (codigo === CODIGO_VALIDO) {
      toast.success("Código correcto. Acceso concedido.");
      onExito();
    } else {
      toast.error("Código incorrecto. Intenta nuevamente.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-superficie p-10 rounded-2xl shadow-2xl w-full max-w-md border border-superficie-borde"
    >
      <Title text="CÓDIGO DE ADMINISTRADOR" className="text-center mb-4" />

      <form onSubmit={verificarCodigo} className="space-y-6">
        <p className="text-sm text-texto-secundario text-center mb-4">
          Ingresa el código secreto de 6 dígitos para crear un nuevo asistente
        </p>

        <div className="flex justify-center">
          <PinInput
            otp
            value={codigo}
            onChange={setCodigo}
            className="gap-2"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <PinInputField
                key={i}
                className="w-12 h-14 text-xl text-center rounded-lg border border-superficie-borde bg-input text-texto focus-visible:ring-2 focus-visible:ring-primary"
              />
            ))}
          </PinInput>
        </div>

        <Button type="submit" className="w-full mt-6">
          Verificar código
        </Button>

        <p className="text-center text-sm mt-4 text-texto-secundario">
          <button
            type="button"
            onClick={onVolver}
            className="hover:underline text-primary"
          >
            Volver al inicio
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default FormularioCodigoAdministrador;
