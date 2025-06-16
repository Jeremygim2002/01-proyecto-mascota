import {
    validateOrden,
    validatePartialOrden
} from '../schemas/ordenSchema.mjs';

export class OrdenController {
    constructor({ ordenModel }) {
        this.ordenModel = ordenModel;
    }

    getAll = async (req, res) => {
        const ordenes = await this.ordenModel.getAll();
        res.json(ordenes);
    };

    getById = async (req, res) => {
        const { id } = req.params;
        const orden = await this.ordenModel.getById({ id });

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.json(orden);
    };

    create = async (req, res) => {
        const result = validateOrden(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const nuevaOrden = await this.ordenModel.create({ input: result.data });
        res.status(201).json(nuevaOrden);
    };

    update = async (req, res) => {
        const { id } = req.params;
        const result = validatePartialOrden(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const orden = await this.ordenModel.getById({ id });
        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await this.ordenModel.update({ id, input: result.data });
        res.json({ message: 'Orden actualizada correctamente' });
    };

    delete = async (req, res) => {
        const { id } = req.params;
        const { id_asistente } = req.body;
        if (!id_asistente) {
            return res.status(400).json({ error: 'ID de asistente requerido para eliminar' });
        }

        const orden = await this.ordenModel.getById({ id });
        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        const success = await this.ordenModel.delete({ id, id_asistente });

        if (!success) {
            return res.status(500).json({ error: 'Error al eliminar orden' });
        }

        res.json({ message: 'Orden eliminada correctamente' });
    };
}
