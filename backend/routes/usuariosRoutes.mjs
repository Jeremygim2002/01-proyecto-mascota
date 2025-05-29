import { Router } from 'express'

import { UsuarioController } from '../controllers/usuarioController.mjs'

export const createUsuarioRouter = ({ usuarioModel }) => {

    const usuariosRouter = Router();

    const usuarioController = new UsuarioController({ usuarioModel })

    // traer todas los usuarios
    usuariosRouter.get('/', usuarioController.getAll)

    // traer usuario por id
    usuariosRouter.get('/:id', usuarioController.getById)


    // insertar nuevo usuario
    usuariosRouter.post('/', usuarioController.create)

    // eliminar usuario por id
    usuariosRouter.delete('/:id', usuarioController.delete)


    // editar una parte de un usuario
    usuariosRouter.patch('/:id', usuarioController.update)

    return usuariosRouter

}