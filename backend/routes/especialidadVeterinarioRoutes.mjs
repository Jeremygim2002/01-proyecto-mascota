import { Router } from 'express';
import { EspecialidadVeterinarioController } from '../controllers/especialidadVeterinarioController.mjs';

export const createEspecialidadesRouter = ({ especialidadVeterinarioModel }) => {
  const router = Router();
  const ctrl = new EspecialidadVeterinarioController({ especialidadVeterinarioModel });

  router.get('/', ctrl.getAll);

  return router;
};
