import pool from '../../config/db.mjs';

export class ServicioModel {
    static async getAll() {
        try {
            const [servicios] = await pool.query('SELECT * FROM vista_servicios_categorias');
            return servicios;
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            throw error;
        }
    }

    static async getById({ id }) {
        try {
            const [[servicio]] = await pool.query(
                'SELECT * FROM vista_servicios_categorias WHERE id_servicio = ?',
                [id]
            );
            return servicio || null;
        } catch (error) {
            console.error(`Error al obtener servicio con ID ${id}:`, error);
            throw error;
        }
    }

    static async create({ input }) {
        const { nombre, descripcion, duracion, precio, estado = true, id_categoria } = input;

        try {
            await pool.query(
                'CALL sp_insertar_servicio(?, ?, ?, ?, ?, ?)',
                [nombre, descripcion, duracion, precio, estado, id_categoria]
            );

            return { nombre, descripcion, duracion, precio, estado, id_categoria };
        } catch (error) {
            console.error('Error al crear servicio:', error);
            throw error;
        }
    }

    static async update({ id, input }) {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(input)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        const sql = `UPDATE servicios SET ${fields.join(', ')} WHERE id = UUID_TO_BIN(?)`;
        values.push(id);

        try {
            await pool.query(sql, values);
        } catch (error) {
            console.error(`Error al actualizar servicio con ID ${id}:`, error);
            throw error;
        }
    }

    static async delete({ id }) {
        try {
            await pool.query('CALL sp_eliminar_servicio(UUID_TO_BIN(?))', [id]);
            return true;
        } catch (error) {
            console.error(`Error al eliminar servicio con ID ${id}:`, error);
            throw error;
        }
    }

    static async updateEstado({ id, estado }) {
        try {
            await pool.query(
                'UPDATE servicios SET estado = ? WHERE id = UUID_TO_BIN(?)',
                [estado, id]
            );
            return true;
        } catch (error) {
            console.error(`Error al actualizar estado del servicio con ID ${id}:`, error);
            throw error;
        }
    }

    static async getByCategoria({ idCategoria }) {
        const [rows] = await pool.query(
            `SELECT BIN_TO_UUID(id) AS id_servicio, nombre, duracion, precio 
FROM servicios 
WHERE id_categoria = ? AND estado = TRUE`,
            [idCategoria]
        );
        return rows;
    }

}
