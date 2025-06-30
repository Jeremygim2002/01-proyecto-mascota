import ModalGeneral from "@common/modals/ModalGeneral";

const ModalDetalleOrden = ({ isOpen, onClose, evento }) => {
  if (!evento) return null;

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Detalle de la Orden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-texto">
        <p>
          <strong>Usuario:</strong> {evento.usuario}
        </p>
        <p>
          <strong>Mascota:</strong> {evento.nombre_mascota}
        </p>
        <p>
          <strong>Veterinario:</strong> {evento.veterinario || "Sin asignar"}
        </p>
        <p>
          <strong>Servicio:</strong> {evento.servicio}
        </p>
        <p>
          <strong>Fecha:</strong> {evento.fecha?.slice(0, 10)}
        </p>
        <p>
          <strong>Hora Inicio:</strong> {evento.hora_inicio}
        </p>
        <p>
          <strong>Hora Fin:</strong> {evento.hora_fin}
        </p>
        <p>
          <strong>Estado:</strong> {evento.estado ? "Pagado" : "No pagado"}
        </p>
      </div>
    </ModalGeneral>
  );
};

export default ModalDetalleOrden;
