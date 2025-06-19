import {
    validateUsuario,
    validatePartialUsuario
} from '../schemas/usuarioSchema.mjs';

export class UsuarioController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel;
    }

    getAll = async (req, res) => {
        const usuarios = await this.usuarioModel.getAll();
        res.json(usuarios);
    };

    getById = async (req, res) => {
        const { id } = req.params;
        const usuario = await this.usuarioModel.getById({ id });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    };

    getByDni = async (req, res) => {
        const { dni } = req.params;
        const usuario = await this.usuarioModel.getByDni({ dni });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    };

    create = async (req, res) => {
        const result = validateUsuario(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const newUsuario = await this.usuarioModel.create({ input: result.data });
        res.status(201).json(newUsuario);
    };

    update = async (req, res) => {
        const { id } = req.params;
        const result = validatePartialUsuario(req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const usuario = await this.usuarioModel.getById({ id });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await this.usuarioModel.update({ id, input: result.data });
        res.json({ message: 'Usuario actualizado' });
    };

    delete = async (req, res) => {
        const { id } = req.params;

        const usuario = await this.usuarioModel.getById({ id });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const success = await this.usuarioModel.delete({ id });

        if (!success) {
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }

        res.json({ message: 'Usuario eliminado' });
    };

    getUsuarioConMascotasByDni = async (req, res) => {
        const { dni } = req.params;

        try {
            const data = await this.usuarioModel.getUsuarioConMascotasByDni(dni);
            if (!data) return res.status(404).json({ error: 'Usuario no encontrado' });

            res.json(data);
        } catch (error) {
            console.error('Error en controlador:', error);
            res.status(500).json({ error: 'Error interno al obtener usuario y mascotas' });
        }
    };

}
