import { useEffect, useState } from "react";
import loaderGif from "@assets/loader.gif";

const Loader = ({ duracion = 3000, onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.(); 
    }, duracion);

    return () => clearTimeout(timer);
  }, [duracion, onFinish]);

  if (!visible) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900 z-50 fixed inset-0">
      <img
        src={loaderGif}
        alt="Cargando..."
        className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-auto object-contain"
      />
    </div>
  );
};

export default Loader;
