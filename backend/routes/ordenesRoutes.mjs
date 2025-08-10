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
    router.patch('/:id/estado', ordenController.toggleEstado);
    router.get('/total/activos', ordenController.contarActivos);
    router.get('/analisis/ingresos-categoria', ordenController.obtenerIngresosPorCategoria);
    router.get('/ingresos/mensuales', ordenController.obtenerIngresosPorMes);
    router.get('/analisis/ordenes-tipo-mascota', ordenController.obtenerOrdenesPorTipoMascota);
    router.get('/mascota/:id_mascota/historial', ordenController.getHistorialByMascota);




    return router;
};
