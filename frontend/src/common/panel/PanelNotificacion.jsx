import { useEffect, useState } from "react";
import PanelGeneral from "./PanelGeneral";
import { obtenerNotificaciones } from "@services/registroService";

const colorPorAccion = {
  INSERT: "bg-green-400",
  UPDATE: "bg-yellow-400",
  DELETE: "bg-red-400",
};

const PanelNotificacion = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerNotificaciones();
        console.log("📥 Notificaciones recibidas:", data);
        setNotificaciones(data.slice(0, 5)); 
      } catch {
        setNotificaciones([{
          accion: "ERROR",
          descripcion: "Error al cargar notificaciones",
          fecha: "",
          asistente: ""
        }]);
      }
    };
    fetch();
  }, []);

  return (
    <PanelGeneral className="w-48 sm:w-96 flex flex-col space-y-3">
      {notificaciones.map((item, idx) => (
        <div key={idx}>
          <div className="cursor-pointer hover:bg-sidebar-hover rounded-lg p-2 transition flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2.5 h-2.5 rounded-full ${colorPorAccion[item.accion] || "bg-gray-400"}`} />
                <span className="text-sm font-bold uppercase text-texto">{item.accion}</span>
              </div>
              <span className="text-xs text-texto-secundario">{item.fecha}</span>
            </div>

            <span className="text-sm text-texto break-words">{item.descripcion}</span>

            {item.asistente && (
              <span className="text-xs text-texto-secundario italic">Asistente: {item.asistente}</span>
            )}
          </div>
          {idx < notificaciones.length - 1 && (
            <hr className="border-panel-flotante-linea my-1" />
          )}
        </div>
      ))}
    </PanelGeneral>
  );
};

export default PanelNotificacion;
