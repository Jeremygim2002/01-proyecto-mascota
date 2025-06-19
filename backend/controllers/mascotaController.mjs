import {
  validateMascota,
  validatePartialMascota
} from '../schemas/mascotaSchema.mjs';

export class MascotaController {
  constructor({ mascotaModel }) {
    this.mascotaModel = mascotaModel;
  }

  getAll = async (req, res) => {
    const mascotas = await this.mascotaModel.getAll();
    res.json(mascotas);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const mascota = await this.mascotaModel.getById({ id });

    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    res.json(mascota);
  };

  create = async (req, res) => {
    const result = validateMascota(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const nuevaMascota = await this.mascotaModel.create({ input: result.data });
    res.status(201).json(nuevaMascota);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validatePartialMascota(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const mascota = await this.mascotaModel.getById({ id });
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    await this.mascotaModel.update({ id, input: result.data });
    res.json({ message: 'Mascota actualizada' });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const mascota = await this.mascotaModel.getById({ id });
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    const success = await this.mascotaModel.delete({ id });

    if (!success) {
      return res.status(500).json({ error: 'Error al eliminar mascota' });
    }

    res.json({ message: 'Mascota eliminada' });
  };

  toggleEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (typeof estado !== 'boolean') {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const mascota = await this.mascotaModel.getById({ id });
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    await this.mascotaModel.updateEstado({ id, estado });
    res.json({ message: 'Estado actualizado correctamente' });
  };

}
