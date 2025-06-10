import ModalGeneral from "@common/modals/ModalGeneral";

const ModalVerVeterinario= ({ isOpen, onClose, personal }) => {
  if (!personal) return null;

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Información del veterinario">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-texto">
        <p><strong>Nombre:</strong> {personal.nombre}</p>
        <p><strong>Correo:</strong> {personal.correo}</p>
        <p><strong>Teléfono:</strong> {personal.telefono}</p>
        <p><strong>DNI:</strong> {personal.dni}</p>
        <p><strong>Rol:</strong> {personal.rol}</p>
        <p><strong>Estado:</strong> {personal.estado ? "Activo" : "Inactivo"}</p>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerVeterinario;
