import { Lock } from "lucide-react";
import CuentaGeneral from "./CuentaGeneral";
import Switch from "@common/ui/Switch";
import { useState } from "react";
import Button from "@common/ui/Button";

const Seguridad = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <CuentaGeneral icon={Lock} title={"Seguridad"}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <span className="text-sm font-medium text-texto">Autenticación en dos pasos</span>
        <div className="mt-2 sm:mt-0 ml-2">
          <Switch estado={twoFactor} setEstado={setTwoFactor} />
        </div>
      </div>

      <div className="mt-10">
        <Button className="transition duration-200">Cambiar Contraseña</Button>
      </div>
    </CuentaGeneral>
  );
};
export default Seguridad;