import { useState } from "react";
import FormularioLogin from "@components/login/FormularioLogin";
import FormularioRegistro from "@components/login/FormularioRegistro";
import FormularioRecuperar from "@components/login/FormularioRecuperar";

const PaginaLogin = () => {
  const [formActivo, setFormActivo] = useState("login"); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 transition-all duration-300">
      {formActivo === "login" && (
        <FormularioLogin
          onOlvidaste={() => setFormActivo("recuperar")}
          onCrearCuenta={() => setFormActivo("registro")}
        />
      )}
      {formActivo === "registro" && (
        <FormularioRegistro onVolver={() => setFormActivo("login")} />
      )}
      {formActivo === "recuperar" && (
        <FormularioRecuperar onVolver={() => setFormActivo("login")} />
      )}
    </div>
  );
};

export default PaginaLogin;
