export class CompuestoController {
  constructor({ compuestoModel }) {
    this.compuestoModel = compuestoModel;
  }

  getAll = async (req, res) => {
    const data = await this.compuestoModel.getAll();
    res.json(data);
  };

}
