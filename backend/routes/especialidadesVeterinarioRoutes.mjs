import { Router } from 'express';
import { EspecialidadVeterinarioController } from '../controllers/especialidadVeterinarioController.mjs';

export const createEspecialidadesRouter = ({ especialidadVeterinarioModel }) => {
  const router = Router();
  const especialidadVeterinarioController = new EspecialidadVeterinarioController({ especialidadVeterinarioModel });

  router.get('/', especialidadVeterinarioController.getAll);

  return router;
};
