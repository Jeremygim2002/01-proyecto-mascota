import {
    validateVeterinario,
    validatePartialVeterinario
} from '../schemas/veterinarioSchema.mjs';

export class VeterinarioController {
    constructor({ veterinarioModel }) {
        this.veterinarioModel = veterinarioModel;
    }

    getAll = async (req, res) => {
        const veterinarios = await this.veterinarioModel.getAll();
        res.json(veterinarios);
    };

    getById = async (req, res) => {
        const { id } = req.params;
        const veterinario = await this.veterinarioModel.getById({ id });

        if (!veterinario) {
            return res.status(404).json({ error: 'Veterinario no encontrado' });
        }

        res.json(veterinario);
    };

    create = async (req, res) => {
        const result = validateVeterinario(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const nuevoVeterinario = await this.veterinarioModel.create({ input: result.data });
        res.status(201).json(nuevoVeterinario);
    };

    update = async (req, res) => {
        const { id } = req.params;
        const result = validatePartialVeterinario(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const veterinario = await this.veterinarioModel.getById({ id });
        if (!veterinario) {
            return res.status(404).json({ error: 'Veterinario no encontrado' });
        }

        await this.veterinarioModel.update({ id, input: result.data });
        res.json({ message: 'Veterinario actualizado correctamente' });
    };


    delete = async (req, res) => {
        const { id } = req.params;

        const veterinario = await this.veterinarioModel.getById({ id });
        if (!veterinario) {
            return res.status(404).json({ error: 'Veterinario no encontrado' });
        }

        try {
            const success = await this.veterinarioModel.delete({ id });

            if (!success) {
                return res.status(500).json({ error: 'Error al eliminar veterinario' });
            }

            res.json({ message: 'Veterinario eliminado' });

        } catch (error) {
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    error: 'No se puede eliminar este veterinario porque está asignado a una orden.',
                });
            }

            console.error('Error al eliminar veterinario:', error);
            res.status(500).json({ error: 'Error inesperado al eliminar veterinario' });
        }
    };


    toggleEstado = async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;

        if (typeof estado !== 'boolean') {
            return res.status(400).json({ error: 'Estado inválido' });
        }

        const veterinario = await this.veterinarioModel.getById({ id });
        if (!veterinario) {
            return res.status(404).json({ error: 'Veterinario no encontrado' });
        }

        await this.veterinarioModel.updateEstado({ id, estado });
        res.json({ message: 'Estado actualizado correctamente' });
    };

    getByCategoria = async (req, res) => {
        const { idCategoria } = req.params;
        if (!idCategoria) return res.status(400).json({ error: 'Falta id de categoría' });

        const veterinarios = await this.veterinarioModel.getByCategoria(idCategoria);
        res.json(veterinarios);
    };

}
