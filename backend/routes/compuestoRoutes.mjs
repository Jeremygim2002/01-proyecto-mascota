import { Router } from 'express';
import { CompuestoController } from '../controllers/compuestoController.mjs';

export const createCompuestoRouter = ({ compuestoModel }) => {
  const router = Router();
  const compuestoController = new CompuestoController({ compuestoModel });

  router.get('/', compuestoController.getAll);

  return router;
};