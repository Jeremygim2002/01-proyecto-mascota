import pool from '../../config/db.mjs';

export class OrdenModel {
    static async getAll() {
        try {
            const [ordenes] = await pool.query('SELECT * FROM vista_ordenes_resumen');
            return ordenes;
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
            throw error;
        }
    }

    static async getById({ id }) {
        try {
            const [[orden]] = await pool.query(
                'SELECT * FROM vista_ordenes_resumen WHERE id_orden = ?',
                [id]
            );
            return orden || null;
        } catch (error) {
            console.error(`Error al obtener orden con ID ${id}:`, error);
            throw error;
        }
    }

    static async create({ input }) {
        const {
            id_mascota,
            id_veterinario,
            id_asistente,
            servicios,
            hora_inicio
        } = input;

        const serviciosTexto = Array.isArray(servicios)
            ? servicios.join(',')
            : servicios;

        try {
            await pool.query(
                'CALL sp_insertar_orden(UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)',
                [id_mascota, id_veterinario, id_asistente, hora_inicio, serviciosTexto]
            );
        } catch (error) {
            console.error('Error al crear orden:', error);
            throw error;
        }
    }


    static async update({ id, input }) {
        const {
            id_mascota,
            id_veterinario,
            estado,
            id_asistente,
            fecha,
            hora_inicio
        } = input;

        try {
            await pool.query(
                'CALL sp_actualizar_orden(UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?, UUID_TO_BIN(?), ?, ?)',
                [id, id_mascota, id_veterinario, estado, id_asistente, fecha, hora_inicio]
            );
            return { success: true };
        } catch (error) {
            console.error(`Error al actualizar orden con ID ${id}:`, error);
            throw error;
        }
    }


    static async delete({ id, id_asistente }) {
        try {
            await pool.query(
                'CALL sp_eliminar_orden(UUID_TO_BIN(?), UUID_TO_BIN(?))',
                [id, id_asistente]
            );
            return { success: true };
        } catch (error) {
            console.error(`Error al eliminar orden con ID ${id}:`, error);
            throw error;
        }
    }

    static async updateEstado({ id, estado }) {
        try {
            await pool.query(
                'UPDATE ordenes SET estado = ? WHERE id = UUID_TO_BIN(?)',
                [estado, id]
            );
            return true;
        } catch (error) {
            console.error(`Error al actualizar estado de la orden con ID ${id}:`, error);
            throw error;
        }
    }

    static async contarActivos() {
        try {
            const [[{ total }]] = await pool.query(
                'SELECT COUNT(*) AS total FROM ordenes WHERE estado = TRUE'
            );
            return total;
        } catch (error) {
            console.error('Error al contar órdenes activas:', error);
            throw error;
        }
    }

    static async obtenerIngresosPorCategoria() {
        try {
            const [result] = await pool.query('SELECT * FROM vista_ingresos_por_categoria');
            return result;
        } catch (error) {
            console.error('Error al obtener ingresos por categoría:', error);
            throw error;
        }
    }

static async obtenerIngresosPorMes() {
  try {
    const [rows] = await pool.query('SELECT * FROM vista_ingresos_mensuales');
    return rows.map(({ mes, ingresos }) => ({
      mes,
      ingresos: Number(ingresos)
    }));
  } catch (error) {
    console.error("Error al obtener ingresos por mes:", error);
    throw error;
  }
}



}
