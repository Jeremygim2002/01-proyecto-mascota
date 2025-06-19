import { Router } from 'express';
import { HistorialController } from '../controllers/historialController.mjs';

export const createHistorialRouter = ({ historialModel }) => {
  const router = Router();
  const historialController = new HistorialController({ historialModel });

  router.get('/', historialController.getAll);

  return router;
};