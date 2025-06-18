import { Router } from 'express';
import { MascotaUsuarioController } from '../controllers/mascotaUsuarioController.mjs';

export const createMascotaUsuarioRouter = ({ mascotaUsuarioModel }) => {
  const router = Router();
  const controller = new MascotaUsuarioController({ mascotaUsuarioModel });

  router.get('/', controller.getAll);
  router.delete('/:id', controller.deleteMascota);

  return router;
};