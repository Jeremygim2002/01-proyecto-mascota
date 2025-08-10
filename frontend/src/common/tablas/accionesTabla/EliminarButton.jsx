
import { Trash2 } from "lucide-react";

const EliminarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-red-400 hover:text-red-300"
    title="Eliminar"
  >
    <Trash2 size={25} />
  </button>
);

export default EliminarButton;
