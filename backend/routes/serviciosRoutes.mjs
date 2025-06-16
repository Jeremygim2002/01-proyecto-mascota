import { Router } from 'express'
import { ServicioController } from '../controllers/servicioController.mjs'

export const createServiciosRouter = ({ servicioModel }) => {
  const serviciosRouter = Router()
  const servicioController = new ServicioController({ servicioModel })

  serviciosRouter.get('/', servicioController.getAll)
  serviciosRouter.get('/:id', servicioController.getById)
  serviciosRouter.post('/', servicioController.create)
  serviciosRouter.patch('/:id', servicioController.update)
  serviciosRouter.delete('/:id', servicioController.delete)
  serviciosRouter.patch('/:id/estado', servicioController.toggleEstado)
  serviciosRouter.get('/categoria/:idCategoria', servicioController.getByCategoria);


  return serviciosRouter
}
