export class EspecialidadCategoriaController {
    constructor({ especialidadCategoriaModel }) {
        this.model = especialidadCategoriaModel;
    }

    getAll = async (req, res) => {
        const relaciones = await this.model.getAll();
        res.json(relaciones);
    };

}
