import { Router } from 'express';
import { TipoMascotaController } from '../controllers/tipoMascotaController.mjs';

export const createTipoMascotaRouter = ({ tipoMascotaModel }) => {
  const router = Router();
  const ctrl = new TipoMascotaController({ tipoMascotaModel });

  router.get('/', ctrl.getAll);

  return router;
};
