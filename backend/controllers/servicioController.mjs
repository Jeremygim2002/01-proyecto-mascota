import {
  validateServicio,
  validatePartialServicio
} from '../schemas/serviciosSchema.mjs';

export class ServicioController {
  constructor({ servicioModel }) {
    this.servicioModel = servicioModel;
  }

  getAll = async (req, res) => {
    const servicios = await this.servicioModel.getAll();
    res.json(servicios);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const servicio = await this.servicioModel.getById({ id });

    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.json(servicio);
  };

  create = async (req, res) => {
    const result = validateServicio(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const nuevoServicio = await this.servicioModel.create({ input: result.data });
    res.status(201).json(nuevoServicio);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validatePartialServicio(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const servicio = await this.servicioModel.getById({ id });
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    await this.servicioModel.update({ id, input: result.data });
    res.json({ message: 'Servicio actualizado correctamente' });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const servicio = await this.servicioModel.getById({ id });
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const success = await this.servicioModel.delete({ id });

    if (!success) {
      return res.status(500).json({ error: 'Error al eliminar servicio' });
    }

    res.json({ message: 'Servicio eliminado' });
  };

  toggleEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (typeof estado !== 'boolean') {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const servicio = await this.servicioModel.getById({ id });
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    await this.servicioModel.updateEstado({ id, estado });
    res.json({ message: 'Estado actualizado correctamente' });
  };
}
