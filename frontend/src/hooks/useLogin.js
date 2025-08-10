import { useEffect, useState } from "react";
import { profile } from "@services/loginService";

export default function useLogin() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificar = async () => {
      try {
        const data = await profile();
        setUsuario(data);
      } catch {
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    verificar();
  }, []);

  return { usuario, loading };
}
