import { Router } from 'express';
import * as usuariosController from '../controllers/usuariosController.mjs';
import { validate } from '../middlewares/validate.mjs';
import { usuarioSchema } from '../schemas/usuariosSchema.mjs';

const router = Router();

router.get('/', usuariosController.getAll);
router.get('/:id', usuariosController.getById);
router.post('/', validate(usuarioSchema), usuariosController.create);
router.put('/:id', validate(usuarioSchema), usuariosController.update);
router.delete('/:id', usuariosController.remove);

export default router;
