export class EspecialidadVeterinarioController {
  constructor({ especialidadVeterinarioModel }) {
    this.especialidadVeterinarioModel = especialidadVeterinarioModel;
  }

  getAll = async (req, res) => {
    const list = await this.especialidadVeterinarioModel.getAll();
    res.json(list);
  };
}
