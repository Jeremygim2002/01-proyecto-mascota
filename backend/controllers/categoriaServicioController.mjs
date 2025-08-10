export class CategoriaServicioController {
  constructor({ categoriaServicioModel }) {
    this.categoriaServicioModel = categoriaServicioModel;
  }

  getAll = async (req, res) => {
    const categorias = await this.categoriaServicioModel.getAll();
    res.json(categorias);
  };
}
