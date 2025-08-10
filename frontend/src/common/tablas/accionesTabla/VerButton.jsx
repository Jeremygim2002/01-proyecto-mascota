import { Eye } from "lucide-react";

const VerButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-blue-400 hover:text-blue-300"
    title="Ver"
  >
    <Eye size={25} />
  </button>
);

export default VerButton;
