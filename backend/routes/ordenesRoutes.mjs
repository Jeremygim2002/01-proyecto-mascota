import { Router } from 'express';
import { OrdenController } from '../controllers/ordenController.mjs';

export const createOrdenesRouter = ({ ordenModel }) => {
    const router = Router();
    const ordenController = new OrdenController({ ordenModel });

    router.get('/', ordenController.getAll);
    router.get('/:id', ordenController.getById);
    router.post('/', ordenController.create);
    router.patch('/:id', ordenController.update);
    router.delete('/:id', ordenController.delete);

    return router;
};
