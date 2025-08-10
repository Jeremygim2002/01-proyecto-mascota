import { Router } from 'express';
import { EspecialidadCategoriaController } from '../controllers/especialidadCategoriaController.mjs';

export const createEspecialidadesCategoriaRouter = ({ especialidadCategoriaModel }) => {
    const router = Router();
    const especialidadCategoriaController = new EspecialidadCategoriaController({ especialidadCategoriaModel });

    router.get('/', especialidadCategoriaController.getAll);

    return router;
};
