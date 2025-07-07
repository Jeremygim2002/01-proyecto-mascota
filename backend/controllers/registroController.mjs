export class RegistroController {
  constructor({ registroModel }) {
    this.registroModel = registroModel;
  }

  listarRecientes = async (req, res) => {
    try {
      const registros = await this.registroModel.getRecientes();
      res.json(registros);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
  };
}
