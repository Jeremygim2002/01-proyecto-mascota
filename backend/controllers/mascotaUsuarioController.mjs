export class MascotaUsuarioController {
  constructor({ mascotaUsuarioModel }) {
    this.mascotaUsuarioModel = mascotaUsuarioModel;
  }

  getAll = async (req, res) => {
    try {
      const data = await this.mascotaUsuarioModel.getAll();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener mascotas + usuarios:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  };

  deleteMascota = async (req, res) => {
    try {
      const { id } = req.params;
      await this.mascotaUsuarioModel.deleteById(id);
      res.json({ message: 'Mascota eliminada correctamente' });
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
      res.status(500).json({ error: 'Error interno al eliminar' });
    }
  };
}
