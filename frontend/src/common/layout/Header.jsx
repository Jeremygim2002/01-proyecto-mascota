import { useRef, useState } from "react";
import { Bell } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import PanelNotificacion from "@common/panel/PanelNotificacion";
import PanelUsuario from "@common/panel/PanelUsuario";
import PanelGeneral from "@common/panel/PanelGeneral";
import Title from "@common/layout/Titulo";
import SearchInput from "@common/ui/SearchInput";
import useClickFuera from "@hooks/common/useClickFuera";

import ModalVerMascotaUsuario from "@components/usuarios/ModalVerMascotaUsuario";
import { buscarUsuarioConMascotasPorDni } from "@services/usuarioService";

const Header = ({ title }) => {
  const [panelActivo, setPanelActivo] = useState(null);
  const [usuarioMascotas, setUsuarioMascotas] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const panelRef = useRef(null);
  const panelBusquedaRef = useRef(null);

  useClickFuera(panelRef, () => setPanelActivo(null));
  useClickFuera(panelBusquedaRef, () => setUsuarioMascotas(null)); // cerrar resultados

  const handleBuscarDni = async (valor) => {
    if (valor.length < 8) return;
    const data = await buscarUsuarioConMascotasPorDni(valor);
    if (data) setUsuarioMascotas(data);
  };

  return (
    <header className="bg-panel border-b border-borde text-texto z-50 relative">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Title text={title} />

        <div className="flex items-center space-x-4 sm:space-x-6 relative" ref={panelRef}>
          <SearchInput
            name="buscar_header"
            placeholder="Buscar por DNI..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleBuscarDni(e.target.value);
              }
            }}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => setPanelActivo("notifications")}
          >
            <Bell size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => setPanelActivo("user")}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-modal-borde shadow-md cursor-pointer">
              <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </motion.button>

          <AnimatePresence>
            {panelActivo === "notifications" && <PanelNotificacion />}
            {panelActivo === "user" && <PanelUsuario />}
          </AnimatePresence>

          {usuarioMascotas && (
            <div ref={panelBusquedaRef}>
              <PanelGeneral className="w-80 mt-2 absolute right-0">
                <p className="text-sm font-semibold text-texto mb-2">
                  {usuarioMascotas.usuario.nombre} {usuarioMascotas.usuario.apellido_paterno}
                </p>
                {usuarioMascotas.mascotas.map((m) => (
                  <div
                    key={m.id_mascota}
                    className="cursor-pointer hover:bg-sidebar-hover rounded p-2 transition"
                    onClick={() => {
                      setMascotaSeleccionada({ ...m, ...usuarioMascotas.usuario });
                      setMostrarModal(true);
                      setUsuarioMascotas(null); // ocultar panel
                    }}
                  >
                    <p className="text-texto text-sm">{m.nombre_mascota}</p>
                    <p className="text-xs text-texto-secundario italic">{m.tipo_mascota}</p>
                  </div>
                ))}
              </PanelGeneral>
            </div>
          )}
        </div>
      </div>

      <ModalVerMascotaUsuario
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        usuario={mascotaSeleccionada}
      />
    </header>
  );
};

export default Header;
