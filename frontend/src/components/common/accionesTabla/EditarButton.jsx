import { Edit } from "lucide-react";

const EditarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-indigo-400 hover:text-indigo-300"
    title="Editar"
  >
    <Edit size={25} />
  </button>
);

export default EditarButton;
