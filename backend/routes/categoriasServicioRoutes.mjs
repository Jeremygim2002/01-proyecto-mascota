import { Router } from 'express';
import { CategoriaServicioController } from '../controllers/categoriaServicioController.mjs';

export const createCategoriaServicioRouter = ({ categoriaServicioModel }) => {
  const router = Router();
  const categoriaServicioController = new CategoriaServicioController({ categoriaServicioModel });

  router.get('/', categoriaServicioController.getAll);

  return router;
};
