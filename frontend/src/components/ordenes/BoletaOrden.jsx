const BoletaOrden = ({ orden }) => {
  if (!orden) return null;

  const {
    usuario,
    nombre_mascota,
    servicio,
    veterinario,
    fecha,
    estado,
    precio
  } = orden;

  return (
    <>
      <div className="bg-superficie text-texto border border-superficie-borde rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">📋 Detalle de Orden</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
          <p><strong>Dueño:</strong> {usuario}</p>
          <p><strong>Mascota:</strong> {nombre_mascota}</p>
          <p><strong>Servicio:</strong> {servicio}</p>
          <p><strong>Veterinario:</strong> {veterinario}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Estado:</strong> {estado ? "Activo" : "Inactivo"}</p>
        </div>
      </div>

      <div className="bg-superficie border border-superficie-borde rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center text-base font-medium">
          <span>Total a pagar:</span>
          <span className="text-green-600 font-bold text-xl">S/ {precio}</span>
        </div>
      </div>
    </>
  );
};

export default BoletaOrden;
