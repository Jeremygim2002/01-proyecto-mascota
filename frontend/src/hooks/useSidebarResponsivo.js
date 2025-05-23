import { useEffect, useState } from "react";

const useSidebarResponsivo = () => {
  const [sidebarAbierto, setSidebarAbierto] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarAbierto(true);
      } else {
        setSidebarAbierto(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [sidebarAbierto, setSidebarAbierto];
};

export default useSidebarResponsivo;
