import { Router } from 'express';
import { MascotaController } from '../controllers/mascotaController.mjs';

export const createMascotasRouter = ({ mascotaModel }) => {
  const mascotasRouter = Router();

  const mascotaController = new MascotaController({ mascotaModel });

  mascotasRouter.get('/', mascotaController.getAll);
  mascotasRouter.get('/:id', mascotaController.getById);
  mascotasRouter.post('/', mascotaController.create);
  mascotasRouter.patch('/:id', mascotaController.update);
  mascotasRouter.delete('/:id', mascotaController.delete);

  return mascotasRouter;
};
