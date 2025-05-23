
import { Link } from "react-router-dom";
import {
  BarChart2,
  SquareChartGantt,
  Menu,
  CalendarPlus,
  SquareUserRound,
  ShoppingCart,
  BriefcaseBusiness,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import useRutasActivas from "../../hooks/useRutasActivas";
import useSidebarResponsivo from "../../hooks/useSidebarResponsivo";  

const SIDEBAR_ITEMS = [
  { name: "Analisis", icon: BarChart2, href: "/" },
  { name: "Servicios", icon: ShoppingCart, href: "/servicios" },
  { name: "Usuarios", icon: SquareUserRound, href: "/usuarios" },
  { name: "Personal", icon: BriefcaseBusiness, href: "/personal" },
  { name: "Ordenes", icon: SquareChartGantt, href: "/ordenes" },
  { name: "Calendario", icon: CalendarPlus, href: "/calendario" },

];

const Sidebar = () => {
  const [sidebarAbierto, setSidebarAbierto] = useSidebarResponsivo();
  const esRutaActiva = useRutasActivas();

  const toggleSidebar = () => {
    setSidebarAbierto(!sidebarAbierto);
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-500 ease-in-out flex-shrink-0 ${
        sidebarAbierto ? "w-64" : "w-20"
      }`}
      animate={{ width: sidebarAbierto ? 256 : 80 }}
    >
      <div className="h-full p-4 flex flex-col border-r bg-panel border-b border-borde text-texto">
        <motion.button
          aria-label="Alternar menú lateral"
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.8 }}
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-sidebar-hover transition-colors max-w-fit"
        >
          <motion.div
            animate={{
              rotate: sidebarAbierto ? 0 : 180,
              scale: sidebarAbierto ? 1 : 1.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Menu size={28} />
          </motion.div>
        </motion.button>

        <nav className="mt-8 flex-grow">
          {/* eslint-disable-next-line no-unused-vars */}
          {SIDEBAR_ITEMS.map(({ name, icon: Icon, href }) => {
            const activo = esRutaActiva(href);
            return (
              <Link key={href} to={href}>
                <motion.div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg mb-2 transition-all ${
                    activo ? "bg-sidebar-hover" : "hover:bg-sidebar-hover"
                  }`}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-center items-center">
                    <Icon size={20} className="text-color-iconos" />
                  </div>
                  <AnimatePresence>
                    {sidebarAbierto && (
                      <motion.span
                        className="ml-4 whitespace-nowrap text-texto font-titulo"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                      >
                        {name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;