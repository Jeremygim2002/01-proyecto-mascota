const SearchInput = ({ className = "", ...props }) => (
  <input
    type="text"
    {...props}
    placeholder="Buscar..."
    className={` font-cuerpo bg-input text-texto placeholder-texto-secundario rounded-full border border-input-borde shadow-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-input-foco ${className}`}
  />
);

export default SearchInput;
