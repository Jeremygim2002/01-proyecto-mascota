
import ModalGeneral from "@common/modals/ModalGeneral";
import DniMascota from "./DniMascota";
import CartillaMascota from "./CartillaMascota";
import Button from "@common/ui/Button";

const ModalVerUsuario = ({ isOpen, onClose, usuario }) => {
  if (!usuario) return null;

  const ordenesDummy = [
    { fecha: "2025-01-15", servicio: "Vacunación", veterinario: "Dr. Pérez", estado: "Completado" },
    { fecha: "2025-02-20", servicio: "Consulta general", veterinario: "Dra. López", estado: "Pendiente" },
    { fecha: "2025-03-10", servicio: "Desparasitación", veterinario: "Dr. Gómez", estado: "Completado" },
  ];

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Información del Usuario">
      <div className="flex flex-col gap-6">
        <DniMascota usuario={usuario} />
        <CartillaMascota ordenes={ordenesDummy} />

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <Button onClick={() => alert("Generar PDF DNI...")}>Generar pdf DNI</Button>
          <Button onClick={() => alert("Generar Cartilla...")}>Generar pdf Cartilla</Button>
        </div>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerUsuario;
