export class TipoMascotaController {
  constructor({ tipoMascotaModel }) {
    this.tipoMascotaModel = tipoMascotaModel;
  }

  getAll = async (req, res) => {
    const tipos = await this.tipoMascotaModel.getAll();
    res.json(tipos);
  };
}
