import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import ModalGeneral from "@common/modals/ModalGeneral";
import DniMascota from "./DniMascota";
import CartillaMascota from "./CartillaMascota";
import Button from "@common/ui/Button";
import CartillaMascotaPDFContent from "./CartillaMascotaPDFContent";
import { obtenerHistorialOrdenesMascota } from "@services/ordenService";  

const ModalVerMascotaUsuario = ({ isOpen, onClose, usuario }) => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    if (!usuario?.id_mascota) return;
    obtenerHistorialOrdenesMascota(usuario.id_mascota)
      .then(setOrdenes)
      .catch(() => setOrdenes([]));
  }, [usuario]);

  const handleImprimir = () => {
    const html = CartillaMascotaPDFContent({ usuario, ordenes });
    const container = document.createElement("div");
    container.innerHTML = html;

    html2pdf().set({
      margin: 0.5,
      filename: `cartilla-${usuario.nombre_mascota}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }).from(container).save();
  };

  if (!usuario?.id_mascota) return null;

  return (
    <ModalGeneral isOpen={isOpen} onClose={onClose} title="Información del Usuario">
      <div className="flex flex-col gap-6">
        <DniMascota usuario={usuario} />
        <CartillaMascota idMascota={usuario.id_mascota} />
        <div className="flex justify-end mt-6">
          <Button onClick={handleImprimir}>Descargar Cartilla PDF</Button>
        </div>
      </div>
    </ModalGeneral>
  );
};

export default ModalVerMascotaUsuario;

