export class EspecialidadCategoriaController {
    constructor({ especialidadCategoriaModel }) {
        this.especialidadCategoriaModel = especialidadCategoriaModel;
    }

    getAll = async (req, res) => {
        const relaciones = await this.especialidadCategoriaModel.getAll();
        res.json(relaciones);
    };

}
