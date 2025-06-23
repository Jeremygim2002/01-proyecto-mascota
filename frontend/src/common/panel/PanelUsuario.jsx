import { useState } from "react";
import { User, LogOut } from "lucide-react";
import PanelGeneral from "./PanelGeneral";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@services/loginService";
import { notificarError, notificarExito } from "@lib/notificaciones";
import Loader from "@common/ui/Loader";

const PanelUsuario = () => {
  const navigate = useNavigate();
  const [mostrandoLoader, setMostrandoLoader] = useState(false);

  const cerrarSesion = async () => {
    try {
      setMostrandoLoader(true);
      await logout();
      notificarExito("Sesión cerrada correctamente");
    } catch (error) {
      setMostrandoLoader(false);
      console.error("Error al cerrar sesión", error);
      notificarError(error);
    }
  };

  if (mostrandoLoader) return <Loader onFinish={() => navigate("/login")} />;

  return (
    <PanelGeneral className="w-48 flex flex-col space-y-3">
      <Link
        aria-label="Ver perfil"
        to="/dashboard/Cuenta"
        className="flex items-center space-x-2 text-texto text-sm hover:bg-sidebar-hover rounded-lg p-2 transition"
      >
        <User size={18} />
        <span>Ver perfil</span>
      </Link>

      <hr className="border-panel-flotante-linea" />

      <button
        onClick={cerrarSesion}
        className="flex items-center space-x-2 text-red-400 text-sm hover:bg-sidebar-hover rounded-lg p-2 transition font-cuerpo"
        aria-label="Cerrar Sesión"
      >
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </button>
    </PanelGeneral>
  );
};

export default PanelUsuario;
