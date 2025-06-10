import { useRef, useState } from "react";
import { Bell } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import PanelNotificacion from "../panel/PanelNotificacion";
import PanelUsuario from "../panel/PanelUsuario";
import PanelBusqueda from "../panel/PanelBusqueda";
import Title from "../layout/Titulo";
import SearchInput from "../ui/SearchInput";
import useClickFuera from "../../hooks/useClickFuera"


const Header = ({ title }) => {
  const [activePanel, setActivePanel] = useState(null);
  const panelRef = useRef(null);

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  useClickFuera(panelRef, () => setActivePanel(null));

  return (
    <header className="bg-panel border-b border-borde text-texto z-50 relative">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Title  text={title} />

        <div className="flex items-center space-x-4 sm:space-x-6 relative" ref={panelRef}>
          <SearchInput
            type="text"
            name="buscar_header"
            placeholder="Buscar..."
            className="hidden sm:block"
            onFocus={() => togglePanel("search")}
          />

          {/* Botón Notificaciones */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => togglePanel("notifications")}
          >
            <Bell size={24} />
          </motion.button>

          {/* Botón Usuario */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => togglePanel("user")}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-modal-borde shadow-md cursor-pointer">
              <img
                src="/avatar.jpg"
                alt="Avatar de usuario"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>

          {/* Paneles */}
          <AnimatePresence>
            {activePanel === "notifications" && <PanelNotificacion />}
            {activePanel === "user" && <PanelUsuario />}
            {activePanel === "search" && <PanelBusqueda />}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
