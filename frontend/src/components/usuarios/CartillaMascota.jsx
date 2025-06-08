const CartillaMascota = ({ ordenes }) => {
  if (!ordenes || ordenes.length === 0)
    return <p className="text-sm text-gray-400">No hay órdenes registradas.</p>;

  return (
    <div className="font-cuerpo bg-input border border-input-borde focus:outline-none focus:ring-2 focus:ring-input-foco text-texto placeholder-texto-secundario rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Historial de Órdenes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-boton-primario text-white">
            <tr>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Servicio</th>
              <th className="px-4 py-2 text-left">Veterinario</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden, index) => (
              <tr key={index} className="hover:bg-input-hover">
                <td className="px-4 py-2">{orden.fecha}</td>
                <td className="px-4 py-2">{orden.servicio}</td>
                <td className="px-4 py-2">{orden.veterinario}</td>
                <td className="px-4 py-2">{orden.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartillaMascota;
