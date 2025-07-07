import { Router } from 'express';
import { RegistroController } from '../controllers/registroController.mjs';
export function createRegistroRouter({ registroModel }) {
    const router = Router();
    const ctrl = new RegistroController({ registroModel });
    router.get('/recientes', ctrl.listarRecientes);
    return router;
}