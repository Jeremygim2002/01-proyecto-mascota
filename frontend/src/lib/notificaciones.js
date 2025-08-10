import { toast } from "sonner";

export function notificarExito(msg = "Operación exitosa") {
  toast.success(msg);
}

export function notificarUsuarioInvalido(msg = "Usuario no válido") {
  toast.warning(msg);
}

export function notificarError(error) {
  if (!error) {
    toast.error("Error desconocido");
    return;
  }

  if (typeof error === "object" && error?.error?.format) {
    const errores = error.error.format();
    for (const campo in errores) {
      const mensajes = errores[campo]?._errors || [];
      mensajes.forEach(msg => toast.error(msg));
    }
    return;
  }

  if (typeof error === "object" && error?.format) {
    const errores = error.format();
    for (const campo in errores) {
      const mensajes = errores[campo]?._errors || [];
      mensajes.forEach(msg => toast.error(msg));
    }
    return;
  }

  if (typeof error === "string") {
    toast.error(error);
    return;
  }

  if (typeof error?.error === "string") {
    toast.error(error.error);
    return;
  }

  toast.error(JSON.stringify(error));
}

export function notificarErroresZod(errorZod) {
  if (!errorZod || typeof errorZod !== "object") return;
  const errores = errorZod.format();
  for (const campo in errores) {
    const detalle = errores[campo]?._errors;
    if (Array.isArray(detalle)) {
      detalle.forEach((mensaje) => toast.error(mensaje));
    }
  }
}