import ModalGeneral from "@common/modals/ModalGeneral";
import BoletaOrden from "@components/ordenes/BoletaOrden";
import Button from "@common/ui/Button";

const ModalVerOrden = ({ isOpen, onClose, orden }) => {
  if (!orden) return null;

  const handleImprimir = () => {
    window.print();
  };

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="📄 Boleta de Orden">
      <div className="flex flex-col gap-6">
        <BoletaOrden orden={orden} />

        <div className="flex justify-end mt-4">
          <Button onClick={handleImprimir}>Imprimir boleta</Button>
        </div>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerOrden;
