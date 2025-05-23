import ModalGeneral from "../common/ModalGeneral";

const ModalVerOrden = ({ isOpen, onClose, orden }) => {
  if (!orden) return null;

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Información de la orden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-texto">
        <p><strong>Servicio:</strong> {orden.servicio}</p>
        <p><strong>Dueño:</strong> {orden.dueno}</p>
        <p><strong>Mascota:</strong> {orden.nombre_mascota}</p>
        <p><strong>Personal encargado:</strong> {orden.personal}</p>
        <p><strong>Fecha:</strong> {orden.fecha}</p>
        <p><strong>Estado:</strong> {orden.estado ? "Activo" : "Inactivo"}</p>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerOrden;
