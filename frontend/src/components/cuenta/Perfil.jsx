import { useEffect, useState } from "react";
import { User } from "lucide-react";
import CuentaGeneral from "./CuentaGeneral";
import Button from "@common/ui/Button";
import { profile } from "@services/loginService";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [, setError] = useState(false);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await profile();
        setPerfil(data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        setError(true);
        alert("No autenticado");
      }
    };

    fetchPerfil();
  }, []);

  return (
    <CuentaGeneral icon={User} title="Perfil">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/3.jpg"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-texto">
            {perfil ? `${perfil.nombre} ${perfil.apellido_paterno} ${perfil.apellido_materno}` : "No encontrado"}
          </h3>
          <p className="text-texto-secundario">
            {perfil ? perfil.correo : "—"}
          </p>
        </div>
      </div>

      <Button className="transition duration-200 w-full sm:w-auto">
        Editar Perfil
      </Button>
    </CuentaGeneral>
  );
};

export default Perfil;
