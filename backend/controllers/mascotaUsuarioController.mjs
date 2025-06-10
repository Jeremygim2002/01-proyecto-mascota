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
}
