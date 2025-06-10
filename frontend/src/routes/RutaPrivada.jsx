import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const RutaPrivada = ({ children }) => {
  const { usuario, loading } = useAuth();
5
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  return usuario ? children : <Navigate to="/login" replace />;
};

export default RutaPrivada;
