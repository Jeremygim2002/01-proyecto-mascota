const DniMascota = ({ usuario }) => {
  if (!usuario) return null;

  const {
    nombre_mascota,
    raza,
    edad,
    nombre_usuario,
    dni,
    estado,
    sexo,
    foto_mascota,
  } = usuario;

  const fotoFinal =
    foto_mascota?.startsWith("http") || foto_mascota?.startsWith("data:")
      ? foto_mascota
      : "/avatar.jpg";

  return (
    <div className="bg-superficie text-texto border border-superficie-borde rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4">📋 DNI de la Mascota</h3>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex flex-col items-center">
          <img
            src={fotoFinal}
            alt="Foto de la mascota"
            className="w-32 h-32 object-cover rounded-xl border-4 border-boton-primario shadow"
          />
          <p className="text-center font-semibold mt-2">{nombre_mascota}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base flex-1">
          <p><strong> Raza:</strong> {raza}</p>
          <p><strong> Edad:</strong> {edad} años</p>
          <p><strong> Sexo:</strong> {sexo}</p>
          <p><strong> Estado:</strong> {estado ? "Activo" : "Inactivo"}</p>
          <p><strong> Dueño:</strong> {nombre_usuario}</p>
          <p><strong> DNI Dueño:</strong> {dni}</p>
        </div>
      </div>
    </div>
  );
};

export default DniMascota;
