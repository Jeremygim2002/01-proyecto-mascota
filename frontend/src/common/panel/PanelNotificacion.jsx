import React from "react";
import PanelGeneral from "./PanelGeneral";

const notificaciones = [
  { color: "bg-green-400", texto: "Nueva notificación: Nuevo cambio" },
  { color: "bg-yellow-400", texto: "Actualización disponible" },
  { color: "bg-red-400", texto: "Error en el sistema" },
];

const PanelNotificacion = () => {
  return (
    <PanelGeneral className="w-48 sm:w-72 flex flex-col space-y-3">
      {notificaciones.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="cursor-pointer hover:bg-sidebar-hover rounded-lg p-2 transition flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            <span className="text-sm text-texto">{item.texto}</span>
          </div>
          {idx < notificaciones.length - 1 && (
            <hr className="border-panel-flotante-linea" />
          )}
        </React.Fragment>
      ))}
    </PanelGeneral>
  );
};

export default PanelNotificacion;
