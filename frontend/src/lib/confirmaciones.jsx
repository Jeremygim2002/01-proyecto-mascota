
import { toast } from "sonner";

export function confirmarAccion({ mensaje = "¿Estás seguro?", onConfirm }) {
    toast.custom((t) => (
        <div className="bg-zinc-800 text-white px-4 py-3 rounded shadow-lg w-[260px] space-y-2 text-sm">
            <p>{mensaje}</p>
            <div className="flex justify-end gap-2 pt-2">
                <button
                    onClick={() => toast.dismiss(t)}
                    className="px-3 py-1 text-xs rounded bg-zinc-600 hover:bg-zinc-700"
                >
                    Cancelar
                </button>
                <button
                    onClick={() => {
                        toast.dismiss(t);
                        onConfirm?.();
                    }}
                    className="px-3 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white"
                >
                    Confirmar
                </button>
            </div>
        </div>
    ));
}
