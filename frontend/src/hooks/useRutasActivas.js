import { useLocation } from "react-router-dom";

/**
 * Hook que compara la ruta actual con una ruta objetivo.
 * @returns {(href: string) => boolean}
 */
const useRutasActivas = () => {
  const location = useLocation();

  const esRutaActiva = (href) => location.pathname === href;

  return esRutaActiva;
};

export default useRutasActivas;
