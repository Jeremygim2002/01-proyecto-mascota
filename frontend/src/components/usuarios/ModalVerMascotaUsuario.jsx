import ModalGeneral from "@common/modals/ModalGeneral";
import DniMascota from "./DniMascota";
import CartillaMascota from "./CartillaMascota";
import Button from "@common/ui/Button";

const ModalVerMascotaUsuario = ({ isOpen, onClose, usuario }) => {
  if (!usuario?.id_mascota) return null;

  const handleImprimir = () => {
    window.print(); 
  };

  return (
    <ModalGeneral
      isOpen={isOpen}
      onClose={onClose}
      title="Información del Usuario"
    >
      <div className="flex flex-col gap-6">
        <DniMascota usuario={usuario} />
        <CartillaMascota idMascota={usuario.id_mascota} />

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <Button onClick={handleImprimir}>Imprimir DNI + Cartilla</Button>
        </div>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerMascotaUsuario;
