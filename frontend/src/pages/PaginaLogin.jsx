import { useState } from "react";
import FormularioLogin from "../components/auth/FormularioLogin";
import FormularioRegistro from "../components/auth/FormularioRegistro";
import FormularioRecuperar from "../components/auth/FormularioRecuperar";

const PaginaLogin = () => {
  const [formActivo, setFormActivo] = useState("login"); // "login" | "registro" | "recuperar"

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 transition-all duration-300">
      {formActivo === "login" && (
        <FormularioLogin
          onOlvidaste={() => setFormActivo("recuperar")}
          onCrearCuenta={() => setFormActivo("registro")}
        />
      )}
      {formActivo === "registro" && (
        <FormularioRegistro
          onVolver={() => setFormActivo("login")}
        />
      )}
      {formActivo === "recuperar" && (
        <FormularioRecuperar
          onVolver={() => setFormActivo("login")}
        />
      )}
    </div>
  );
};

export default PaginaLogin;
