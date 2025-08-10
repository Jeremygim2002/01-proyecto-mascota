import { useEffect, useState } from "react";
import { obtenerHistorialOrdenesMascota } from "@services/ordenService";

const CartillaMascota = ({ idMascota }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const data = await obtenerHistorialOrdenesMascota(idMascota);
        setOrdenes(data);
      } catch {
        setError("No se pudo cargar el historial");
      } finally {
        setLoading(false);
      }
    };

    if (idMascota) cargarHistorial();
  }, [idMascota]);

  if (loading) return <p className="text-slate-400 p-4">Cargando historial…</p>;
  if (error) return <p className="text-red-400 p-4">{error}</p>;
  if (ordenes.length === 0)
    return (
      <div className="bg-superficie text-texto placeholder-texto-secundario border border-superficie-borde rounded-xl p-4 shadow-sm">
        <p className="text-sm text-texto-secundario">No hay órdenes registradas.</p>
      </div>
    );

  return (
    <div className="bg-superficie text-texto border border-superficie-borde rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">📑 Historial de Órdenes</h3>

      <div className="overflow-x-auto rounded-lg border border-superficie-borde">
        <table className="min-w-full divide-y divide-superficie-borde text-sm">
          <thead className="text-white">
            <tr>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Servicio</th>
              <th className="px-4 py-2 text-left">Veterinario</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-superficie-borde">
            {ordenes.map((orden, index) => (
              <tr key={index} className="hover:bg-input-hover">
                <td className="px-4 py-2">{new Date(orden.fecha).toLocaleDateString("es-PE")}</td>
                <td className="px-4 py-2">{orden.hora_inicio} - {orden.hora_fin}</td>
                <td className="px-4 py-2">{orden.servicio}</td>
                <td className="px-4 py-2">{orden.veterinario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartillaMascota;
