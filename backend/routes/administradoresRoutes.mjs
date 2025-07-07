import { Router } from 'express';
import { AdministradorController } from '../controllers/administradorController.mjs';

export function createAdministradoresRouter({ administradorModel }) {
  const router = Router();
  const controller = new AdministradorController({ administradorModel });
  router.get('/', controller.getAll);
  return router;
}
