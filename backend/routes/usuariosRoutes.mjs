import { Router } from 'express'
import { UsuarioController } from '../controllers/usuarioController.mjs'

export const createUsuarioRouter = ({ usuarioModel }) => {
    const usuariosRouter = Router();

    const usuarioController = new UsuarioController({ usuarioModel })

    usuariosRouter.get('/', usuarioController.getAll)
    usuariosRouter.get('/:id', usuarioController.getById)
    usuariosRouter.post('/', usuarioController.create)
    usuariosRouter.delete('/:id', usuarioController.delete)
    usuariosRouter.patch('/:id', usuarioController.update)
    usuariosRouter.get('/dni/:dni', usuarioController.getByDni);


    return usuariosRouter
}