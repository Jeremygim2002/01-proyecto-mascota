import { Router } from 'express';
import { OrdenController } from '../controllers/ordenController.mjs';

export const createOrdenesRouter = ({ ordenModel }) => {
    const router = Router();
    const ctrl = new OrdenController({ ordenModel });

    router.get('/', ctrl.getAll);
    router.get('/:id', ctrl.getById);
    router.post('/', ctrl.create);
    router.patch('/:id', ctrl.update);
    router.delete('/:id', ctrl.delete);

    return router;
};
