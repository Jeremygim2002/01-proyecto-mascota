import { useState, useEffect } from 'react';
import { obtenerOrdenesPorTipoMascota } from '@services/ordenService';

export default function useOrdenesPorTipoMascota() {
  const [data, setData] = useState([]);
  useEffect(() => {
    obtenerOrdenesPorTipoMascota()
      .then(setData)
      .catch(console.error);
  }, []);
  return data;
}
