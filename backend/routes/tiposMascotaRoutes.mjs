import { Router } from 'express';
import { TipoMascotaController } from '../controllers/tipoMascotaController.mjs';

export const createTipoMascotaRouter = ({ tipoMascotaModel }) => {
  const router = Router();
  const tipoMascotaController = new TipoMascotaController({ tipoMascotaModel });

  router.get('/', tipoMascotaController.getAll);

  return router;
};
