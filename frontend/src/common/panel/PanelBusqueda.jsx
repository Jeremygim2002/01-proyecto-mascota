import { useState } from "react";
import SearchInput from "@common/ui/SearchInput";
import PanelGeneral from "@common/panel/PanelGeneral";
import ModalVerMascotaUsuario from "@components/usuarios/ModalVerMascotaUsuario";
import { buscarUsuarioConMascotasPorDni } from "@services/usuarioService";

const Header = () => {
  const [usuarioMascotas, setUsuarioMascotas] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleBuscarDni = async (valor) => {
    if (valor.length < 8) return;
    const data = await buscarUsuarioConMascotasPorDni(valor);
    if (data) setUsuarioMascotas(data);
  };

  return (
    <>
      <div className="relative z-50 p-4">
        <SearchInput
          name="buscar_dni"
          placeholder="Buscar por DNI..."
          onChange={(e) => handleBuscarDni(e.target.value)}
        />

        {usuarioMascotas && (
          <PanelGeneral className="w-80 mt-2 absolute right-0">
            <p className="text-sm font-semibold text-texto mb-2">
              {usuarioMascotas.usuario.nombre} {usuarioMascotas.usuario.apellido_paterno}
            </p>
            {usuarioMascotas.mascotas.map((m) => (
              <div
                key={m.id_mascota}
                className="cursor-pointer hover:bg-sidebar-hover rounded p-2 transition"
                onClick={() => {
                  setUsuarioMascotas({ ...m, ...usuarioMascotas.usuario });
                  setMostrarModal(true);
                }}
              >
                <p className="text-texto text-sm">{m.nombre_mascota}</p>
                <p className="text-xs text-texto-secundario italic">{m.tipo_mascota}</p>
              </div>
            ))}
          </PanelGeneral>
        )}
      </div>

      <ModalVerMascotaUsuario
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        usuario={usuarioMascotas}
      />
    </>
  );
};

export default Header;
