import { useRef } from "react";
import html2pdf from "html2pdf.js";
import ModalGeneral from "@common/modals/ModalGeneral";
import BoletaOrden from "@components/ordenes/BoletaOrden";
import Button from "@common/ui/Button";
import BoletaPDFContent from "@components/ordenes/BoletaPDFContent";

const ModalVerOrden = ({ isOpen, onClose, orden }) => {
  const boletaRef = useRef();

  const handleImprimir = () => {
    if (!boletaRef.current) return;

    const html = BoletaPDFContent(orden);
    const container = document.createElement("div");
    container.innerHTML = html;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `boleta-${orden.id_orden || "orden"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(container)
      .save();
  };

  if (!orden) return null;

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="📄 Boleta de Orden">
      <div className="flex flex-col gap-6">
        <div ref={boletaRef}>
          <BoletaOrden orden={orden} />
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleImprimir}>Descargar PDF</Button>
        </div>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerOrden;
