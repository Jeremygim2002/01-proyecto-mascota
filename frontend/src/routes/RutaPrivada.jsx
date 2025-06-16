// routes/RutaPrivada.jsx
import { Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";

const RutaPrivada = ({ children }) => {
  const { usuario, loading } = useLogin();

  if (loading) return null; 

  return usuario ? children : <Navigate to="/login" replace />;
};

export default RutaPrivada;
