const Button = ({ children, onClick, type = "button", className = "" }) => (
  <div className="flex justify-end">
    <button
      type={type}
      onClick={onClick}
      className={`font-cuerpo bg-boton-primario hover:bg-boton-hover text-white font-bold py-2 px-4 rounded-lg ${className}`}
    >
      {children}
    </button>
  </div>
);

export default Button;
