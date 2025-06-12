const CartillaMascota = ({ ordenes }) => {
  if (!ordenes || ordenes.length === 0)
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
          <thead className="bg-boton-primario text-white">
            <tr>
              <th className="px-4 py-2 text-left">📅 Fecha</th>
              <th className="px-4 py-2 text-left">🩺 Servicio</th>
              <th className="px-4 py-2 text-left">👨‍⚕️ Veterinario</th>
              <th className="px-4 py-2 text-left">📶 Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-superficie-borde">
            {ordenes.map((orden, index) => (
              <tr key={index} className="hover:bg-input-hover">
                <td className="px-4 py-2">{orden.fecha}</td>
                <td className="px-4 py-2">{orden.servicio}</td>
                <td className="px-4 py-2">{orden.veterinario}</td>
                <td className="px-4 py-2 font-semibold">
                  {orden.estado === "Completado" ? (
                    <span className="text-green-400">✅ Completado</span>
                  ) : (
                    <span className="text-yellow-300">⏳ Pendiente</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartillaMascota;
