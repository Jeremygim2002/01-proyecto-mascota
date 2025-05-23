import { User } from "lucide-react";
import CuentaGeneral from "./CuentaGeneral";
import Button from "../common/forms/Button";

const Perfil = () => {
  return (
    <CuentaGeneral icon={User} title={"Perfil"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/3.jpg"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-texto">Jeremy Rosas Caparachin</h3>
          <p className="text-texto-secundario">jremygim@gmail.com</p>
        </div>
      </div>

      <Button className="transition duration-200 w-full sm:w-auto">
        Editar Perfil
      </Button>
    </CuentaGeneral>
  );
};
export default Perfil;
