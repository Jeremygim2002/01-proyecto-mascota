import { User, LogOut } from "lucide-react";
import PanelGeneral from "./PanelGeneral";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "@services/authService";

const PanelUsuario = () => {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await logout(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      alert("Hubo un problema al cerrar sesión.");
    }
  };

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

      <button
        onClick={cerrarSesion}
        className="flex items-center space-x-2 text-red-400 text-sm hover:bg-sidebar-hover rounded-lg p-2 transition font-cuerpo"
        aria-label="Cerrar Sesion"
      >
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </button>
    </PanelGeneral>
  );
};

export default PanelUsuario;
