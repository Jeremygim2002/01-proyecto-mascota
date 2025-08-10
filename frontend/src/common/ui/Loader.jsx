import { useEffect, useState } from "react";
import loaderGif from "@assets/loader.gif";

const DURACION_PREDETERMINADA = 2000;

const Loader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.(); 
    }, DURACION_PREDETERMINADA);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <img
        src={loaderGif}
        alt="Cargando..."
        className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto object-contain"
      />
    </div>
  );
};

export default Loader;
