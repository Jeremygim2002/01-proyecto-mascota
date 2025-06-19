export class HistorialController {
  constructor({ historialModel }) {
    this.historialModel = historialModel;
  }

  getAll = async (req, res) => {
    try {
      const data = await this.historialModel.getAll();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener mascotas + usuarios:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  };


}
