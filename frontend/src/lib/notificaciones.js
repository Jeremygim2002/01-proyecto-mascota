import { toast } from "sonner";

// ✅ Éxito
export function notificarExito(msg = "Operación exitosa") {
  toast.success(msg);
}

// ⚠️ Usuario no válido
export function notificarUsuarioInvalido(msg = "Usuario no válido") {
  toast.warning(msg);
}

// ❌ Errores de respuesta del backend o validaciones zod
export function notificarError(error) {
  if (!error) {
    toast.error("Error desconocido");
    return;
  }

  // 🔁 Si es string simple
  if (typeof error === "string") {
    toast.error(error);
    return;
  }

  // 🧠 Si viene como `{ error: "mensaje" }`
  if (typeof error?.error === "string") {
    toast.error(error.error);
    return;
  }
}