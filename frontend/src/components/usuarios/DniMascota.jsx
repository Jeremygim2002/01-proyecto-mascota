const DniMascota = ({ usuario }) => {
  if (!usuario) return null;

  return (
    <div className="font-cuerpo bg-input border border-input-borde focus:outline-none focus:ring-2 focus:ring-input-foco text-texto placeholder-texto-secundario rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">DNI de la Mascota</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={usuario.foto_mascota || "../../../public/avatar.jpg"}
          alt="Foto de la mascota"
          className="w-32 h-32 object-cover rounded-xl border-4 border-boton-primario"
        />
        <div className="space-y-1 text-sm md:text-base">
          <p><strong>Nombre:</strong> {usuario.nombre_mascota}</p>
          <p><strong>Raza:</strong> {usuario.raza_mascota}</p>
          <p><strong>Edad:</strong> {usuario.edad_mascota} años</p>
          <p><strong>Dueño:</strong> {usuario.nombre_usuario}</p>
          <p><strong>DNI Dueño:</strong> {usuario.dni}</p>
          <p><strong>Estado:</strong> {usuario.estado ? "Activo" : "Inactivo"}</p>
        </div>
      </div>
    </div>
  );
};

export default DniMascota;
