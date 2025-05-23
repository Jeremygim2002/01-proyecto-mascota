import { useState } from "react";
import CuentaGeneral from "./CuentaGeneral";
import { Bell } from "lucide-react";
import Switch from "../common/forms/Switch";

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState({
    push: true,
    email: false,
    sms: true,
  });

  const switches = [
    {
      label: "Nuevos Servicios",
      estado: notificaciones.push,
      setEstado: () =>
        setNotificaciones({ ...notificaciones, push: !notificaciones.push }),
    },
    {
      label: "Nuevos Usuarios",
      estado: notificaciones.email,
      setEstado: () =>
        setNotificaciones({ ...notificaciones, email: !notificaciones.email }),
    },
    {
      label: "Nuevo Personal",
      estado: notificaciones.sms,
      setEstado: () =>
        setNotificaciones({ ...notificaciones, sms: !notificaciones.sms }),
    },
  ];

  return (
    <CuentaGeneral icon={Bell} title={"Notificaciones"}>
      <div className="space-y-8">
        {switches.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm font-medium text-texto mb-2 sm:mb-0">
              {item.label}
            </span>
            <div className="ml-2">
              <Switch estado={item.estado} setEstado={item.setEstado} />
            </div>
          </div>
        ))}
      </div>
    </CuentaGeneral>
  );
};

export default Notificaciones;
