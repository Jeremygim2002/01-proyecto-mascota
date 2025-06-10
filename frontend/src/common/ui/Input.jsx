const Input = ({ className = "", ...props }) => (
    <input
      {...props}
      className={`font-cuerpo bg-input border border-input-borde focus:outline-none focus:ring-2 focus:ring-input-foco text-texto placeholder-texto-secundario rounded-lg pr-4 py-2 ${className}`}
    />
  );
  
  export default Input;
  