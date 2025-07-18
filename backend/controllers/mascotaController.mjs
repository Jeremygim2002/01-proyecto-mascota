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
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    try {
      const success = await this.mascotaModel.delete({ id });

      if (!success) {
        return res.status(400).json({
          error: "No se puede eliminar la mascota porque tiene órdenes asociadas",
        });
      }

      res.json({ message: "Mascota eliminada correctamente" });
    } catch (error) {
      console.error("Error inesperado al eliminar mascota:", error);
      res.status(500).json({ error: "Error interno al eliminar mascota" });
    }
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

  getPorDni = async (req, res) => {
    const { dni } = req.params;
    try {
      const data = await this.mascotaModel.getActivasPorUsuarioDni({ dni });
      if (!data.usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(data);
    } catch (error) {
      console.error("Error al buscar usuario y mascotas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }


  contarActivas = async (req, res) => {
    try {
      const total = await this.mascotaModel.contarActivas();
      res.json({ total });
    } catch (error) {
      console.error('Error al contar mascotas activas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


}
