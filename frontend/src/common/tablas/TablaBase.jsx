// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import VerButton from "./accionesTabla/VerButton";
import EditarButton from "./accionesTabla/EditarButton";
import EliminarButton from "./accionesTabla/EliminarButton";
import Switch from "../ui/Switch";

const TablaBase = ({
  columnas,
  datos,
  onVer,
  onEditar,
  onEliminar,
  onToggleEstado,
  mostrarEstado = true,
  mostrarAcciones = true,
  idKey = "id",
  textoEstado = ["Activo", "Inactivo"],
}) => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full divide-y divide-tabla-linea-inicial">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold font-cuerpo text-texto-secundario uppercase tracking-wider">
              Ver
            </th>
            {columnas.map((col) => (
              <th
                key={col.id}
                className="px-6 py-3 text-left text-xs font-bold font-cuerpo text-texto-secundario uppercase tracking-wider "
              >
                {col.label}
              </th>
            ))}
            {mostrarEstado && (
              <th className="px-6 py-3 text-left text-xs font-bold font-cuerpo text-texto-secundario uppercase tracking-wider">
                Estado
              </th>
            )}
            {mostrarAcciones && (
              <th className="px-6 py-3 text-left text-xs font-bold font-cuerpo text-texto-secundario uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-modal-borde">
          {datos.map((fila) => (
            <motion.tr
              key={fila[idKey] ?? JSON.stringify(fila)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-superficie-hover transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-texto-secundario font-medium">
                <VerButton onClick={() => onVer(fila)} />
              </td>

              {columnas.map((col) => (
                <td
                  key={col.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-texto font-cuerpo"
                >
                  {col.render ? col.render(fila) : fila[col.id]}
                </td>
              ))}

              {mostrarEstado && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-texto">
                  <Switch
                    estado={fila.estado}
                    onToggle={() => onToggleEstado(fila[idKey], fila.estado)}
                    texto={textoEstado}
                  />
                </td>
              )}

              {mostrarAcciones && (
                <td className="px-7 py-4 whitespace-nowrap text-sm text-texto flex gap-2">
                  <EditarButton onClick={() => onEditar(fila)} />
                  <EliminarButton onClick={() => onEliminar(fila[idKey])} />
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaBase;
