import { useMemo } from "react";

export function useFiltrado(data = [], campos = [], termino = "") {
  const filtrado = useMemo(() => {
    return data.filter((item) =>
      campos.some((campo) =>
        String(item[campo] ?? "").toLowerCase().includes(termino)
      )
    );
  }, [data, campos, termino]);

  return filtrado;
}
