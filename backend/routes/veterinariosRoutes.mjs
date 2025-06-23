import { Router } from 'express';
import { VeterinarioController } from '../controllers/veterinarioController.mjs';

export const createVeterinariosRouter = ({ veterinarioModel }) => {
  const veterinariosRouter = Router();
  const veterinarioController = new VeterinarioController({ veterinarioModel });

  veterinariosRouter.get('/', veterinarioController.getAll);
  veterinariosRouter.get('/:id', veterinarioController.getById);
  veterinariosRouter.post('/', veterinarioController.create);
  veterinariosRouter.patch('/:id', veterinarioController.update);
  veterinariosRouter.delete('/:id', veterinarioController.delete);
  veterinariosRouter.patch('/:id/estado', veterinarioController.toggleEstado);
  veterinariosRouter.get('/categoria/:idCategoria', veterinarioController.getByCategoria);
  veterinariosRouter.get('/total/especialidades', veterinarioController.contarPorEspecialidad);



  return veterinariosRouter;
};