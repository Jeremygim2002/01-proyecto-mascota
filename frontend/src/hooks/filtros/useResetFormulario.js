export const useResetFormulario = (setters, valores = []) => () => {
  setters.forEach((fn, i) => fn(valores[i]));
};