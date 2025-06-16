import ModalGeneral from "@common/modals/ModalGeneral";

const ModalVerVeterinario = ({
  isOpen,
  onClose,
  veterinario,
  especialidades = [],
}) => {
  if (!veterinario) return null;

  const especialidadNombre =
    especialidades.find(
      (esp) => String(esp.id) === String(veterinario.id_especialidad)
    )?.nombre || "Sin asignar";

  return (
    <ModalGeneral
      isOpen={isOpen}
      onClose={onClose}
      title="Información del veterinario"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-texto">
        <p>
          <strong>Nombre:</strong> {veterinario.nombre}
        </p>
        <p>
          <strong>Correo:</strong> {veterinario.correo}
        </p>
        <p>
          <strong>Teléfono:</strong> {veterinario.numero_telefono}
        </p>
        <p>
          <strong>DNI:</strong> {veterinario.dni}
        </p>
        <p>
          <strong>Especialidad:</strong> {especialidadNombre}
        </p>
        <p>
          <strong>Estado:</strong> {veterinario.estado ? "Activo" : "Inactivo"}
        </p>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerVeterinario;
