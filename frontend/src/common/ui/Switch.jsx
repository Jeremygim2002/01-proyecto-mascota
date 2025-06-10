const Switch = ({ estado, onToggle }) => (
  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors duration-300 ${
        estado ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div
        className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 transform ${
          estado ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
    <span className="text-sm text-texto-secundario w-16 text-left font-cuerpo">
      {estado ? "Activo" : "Inactivo"}
    </span>
  </div>
);
export default Switch;
