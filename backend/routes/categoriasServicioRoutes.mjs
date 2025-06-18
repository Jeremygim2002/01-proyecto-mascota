import { Router } from 'express';
import { CategoriaServicioController } from '../controllers/categoriaServicioController.mjs';

export const createCategoriaServicioRouter = ({ categoriaServicioModel }) => {
  const router = Router();
  const ctrl = new CategoriaServicioController({ categoriaServicioModel });

  router.get('/', ctrl.getAll);

  return router;
};
