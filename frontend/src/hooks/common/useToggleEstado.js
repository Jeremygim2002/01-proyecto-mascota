export function useToggleEstado(setData, claveId = "id", toggleApi) {
  const toggleEstado = async (id, estadoActual) => {
    try {
      await toggleApi(id, !estadoActual);
      setData((prev) =>
        prev.map((item) =>
          item[claveId] === id ? { ...item, estado: !estadoActual } : item
        )
      );
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  return toggleEstado;
}
