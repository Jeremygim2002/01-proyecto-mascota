import ModalGeneral from "@common/modals/ModalGeneral";

const ModalVerServicio = ({ isOpen, onClose, servicio }) => {
  if (!servicio) return null;

  return (
    <ModalGeneral
      isOpen={isOpen}
      onClose={onClose}
      title="Información del servicio"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-texto">
        <p>
          <strong>Nombre:</strong> {servicio.nombre}
        </p>
        <p>
          <strong>Categoría:</strong> {servicio.categoria || "Sin categoría"}
        </p>
        <p>
          <strong>Descripción:</strong> {servicio.descripcion}
        </p>
        <p>
          <strong>Duración:</strong> {servicio.duracion} minutos
        </p>
        <p>
          <strong>Precio:</strong> S/ {Number(servicio.precio).toFixed(2)}
        </p>
        <p>
          <strong>Estado:</strong> {servicio.estado ? "Activo" : "Inactivo"}
        </p>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerServicio;
