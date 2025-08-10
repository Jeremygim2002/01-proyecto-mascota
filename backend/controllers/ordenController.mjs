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

        try {
            await this.ordenModel.create({ input: result.data });
            res.status(201).json({ message: 'Orden registrada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message || 'Error al registrar la orden' });
        }
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



    toggleEstado = async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;

        if (typeof estado !== 'boolean') {
            return res.status(400).json({ error: 'Estado inválido' });
        }

        const orden = await this.ordenModel.getById({ id });
        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await this.ordenModel.updateEstado({ id, estado });
        res.json({ message: 'Estado actualizado correctamente' });
    };

    contarActivos = async (req, res) => {
        try {
            const total = await this.ordenModel.contarActivos();
            res.json({ total });
        } catch (error) {
            console.error('Error al contar órdenes activas:', error);
            res.status(500).json({ error: 'Error interno al contar órdenes' });
        }
    };

    obtenerIngresosPorCategoria = async (req, res) => {
        try {
            const datos = await this.ordenModel.obtenerIngresosPorCategoria();
            res.json(datos);
        } catch (error) {
            console.error('Error al obtener ingresos por categoría:', error);
            res.status(500).json({ error: 'Error interno al obtener ingresos por categoría' });
        }
    };
    obtenerIngresosPorMes = async (req, res) => {
        try {
            const datos = await this.ordenModel.obtenerIngresosPorMes();
            res.json(datos);
        } catch (error) {
            console.error("Error al obtener ingresos mensuales:", error);
            res.status(500).json({ error: "Error interno al obtener ingresos mensuales" });
        }
    };

    obtenerOrdenesPorTipoMascota = async (req, res) => {
        try {
            const datos = await this.ordenModel.obtenerOrdenesPorTipoMascota();
            res.json(datos);
        } catch (error) {
            console.error('Error al obtener órdenes por tipo de mascota:', error);
            res.status(500).json({ error: 'Error interno obteniendo datos' });
        }
    };
    getHistorialByMascota = async (req, res) => {
        const { id_mascota } = req.params;

        try {
            const historial = await this.ordenModel.getHistorialByMascota({ id_mascota });
            res.json(historial);
        } catch (error) {
            console.error('Error obteniendo historial por mascota:', error);
            res.status(500).json({ error: 'Error interno al obtener historial' });
        }
    };




}
