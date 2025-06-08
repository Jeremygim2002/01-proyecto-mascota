import { User, LogOut } from "lucide-react";
import PanelGeneral from "../PanelGeneral";
import { Link } from "react-router-dom";

const PanelUsuario = () => {
  return (
    <PanelGeneral className="w-48 flex flex-col space-y-3">
      <Link
        aria-label="Ver perfil"
        to="/dashboard/Cuenta"
        className="flex items-center space-x-2 text-texto text-sm hover:bg-sidebar-hover rounded-lg p-2 transition"
      >
        <User size={18} />
        <span href="../../../pages/PaginaCuenta.jsx">Ver perfil</span>
      </Link>

      <hr className="border-panel-flotante-linea" />

      <Link
        className="flex items-center space-x-2 text-red-400 text-sm hover:bg-sidebar-hover rounded-lg p-2 transition font-cuerpo"
        aria-label="Cerrar Sesion"
        to="/login"
      >
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </Link>
    </PanelGeneral>
  );
};

export default PanelUsuario;
