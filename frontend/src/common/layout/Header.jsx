import { useRef, useState } from "react";
import { Bell } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import PanelNotificacion from "@common/panel/PanelNotificacion";
import PanelUsuario from "@common/panel/PanelUsuario";
import PanelBusqueda from "@common/panel/PanelBusqueda";
import Title from "@common/layout/Titulo";
import SearchInput from "@common/ui/SearchInput";
import useClickFuera from "@hooks/common/useClickFuera";

const Header = ({ title }) => {
  const [panelActivo, setPanelActivo] = useState(null);
  const panelRef = useRef(null);

  const alternarPanel = (panel) => {
    setPanelActivo((prev) => (prev === panel ? null : panel));
  };

  useClickFuera(panelRef, () => setPanelActivo(null));

  return (
    <header className="bg-panel border-b border-borde text-texto z-50 relative">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Title text={title} />

        <div className="flex items-center space-x-4 sm:space-x-6 relative" ref={panelRef}>
          <SearchInput
            name="buscar_header"
            placeholder="Buscar..."
            className="hidden sm:block"
            onFocus={() => alternarPanel("search")}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => alternarPanel("notifications")}
          >
            <Bell size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => alternarPanel("user")}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-modal-borde shadow-md cursor-pointer">
              <img
                src="/avatar.jpg"
                alt="Avatar de usuario"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>

          <AnimatePresence>
            {panelActivo === "notifications" && <PanelNotificacion />}
            {panelActivo === "user" && <PanelUsuario />}
            {panelActivo === "search" && <PanelBusqueda />}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
