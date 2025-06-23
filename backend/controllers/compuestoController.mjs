export class CompuestoController {
  constructor({ compuestoModel }) {
    this.compuestoModel = compuestoModel;
  }

  getAll = async (req, res) => {
    try {
      const data = await this.compuestoModel.getAll();
      res.json(data);
    } catch (error) {
      console.error('Error al obtener mascotas + usuarios:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  };


}
