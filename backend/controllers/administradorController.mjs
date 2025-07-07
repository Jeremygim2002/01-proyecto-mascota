export class AdministradorController {
  constructor({ administradorModel }) {
    this.model = administradorModel;
  }

  getAll = async (req, res) => {
    const admins = await this.model.getAll();
    res.json(admins);
  };
}
