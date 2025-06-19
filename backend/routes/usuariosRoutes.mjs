import { Router } from 'express'
import { UsuarioController } from '../controllers/usuarioController.mjs'

export const createUsuarioRouter = ({ usuarioModel }) => {
    const usuariosRouter = Router();

    const usuarioController = new UsuarioController({ usuarioModel })

    usuariosRouter.get('/', usuarioController.getAll);
    usuariosRouter.post('/', usuarioController.create);
    usuariosRouter.get('/dni/:dni', usuarioController.getByDni);
    usuariosRouter.get('/mascotas/:dni', usuarioController.getUsuarioConMascotasByDni);

    usuariosRouter.patch('/:id', usuarioController.update);
    usuariosRouter.delete('/:id', usuarioController.delete);
    usuariosRouter.get('/:id', usuarioController.getById);

    return usuariosRouter;
}