import pool from '../../config/db.mjs';

export class VeterinarioModel {
  static async getAll() {
    try {
      const [veterinarios] = await pool.query('SELECT * FROM vista_veterinarios_especialidad');
      return veterinarios;
    } catch (error) {
      console.error('Error al obtener veterinarios:', error);
      throw error;
    }
  }

  static async getById({ id }) {
    try {
      const [[veterinario]] = await pool.query(
        'SELECT * FROM vista_veterinarios_especialidad WHERE id_veterinario = ?',
        [id]
      );
      return veterinario || null;
    } catch (error) {
      console.error(`Error al obtener veterinario con ID ${id}:`, error);
      throw error;
    }
  }

  static async create({ input }) {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      numero_telefono,
      dni,
      estado = true,
      id_especialidad
    } = input;

    try {
      await pool.query(
        'CALL sp_insertar_veterinario(?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, estado, id_especialidad]
      );

      return {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        numero_telefono,
        dni,
        estado,
        id_especialidad
      };
    } catch (error) {
      console.error('Error al crear veterinario:', error);
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

    const sql = `UPDATE veterinario SET ${fields.join(', ')} WHERE id = UUID_TO_BIN(?)`;
    values.push(id);

    try {
      await pool.query(sql, values);
    } catch (error) {
      console.error(`Error al actualizar veterinario con ID ${id}:`, error);
      throw error;
    }
  }


  static async delete({ id }) {
    try {
      await pool.query('CALL sp_eliminar_veterinario(UUID_TO_BIN(?))', [id]);
      return true;
    } catch (error) {
      console.error(`Error al eliminar veterinario con ID ${id}:`, error);
      throw error;
    }
  }

  static async updateEstado({ id, estado }) {
    try {
      await pool.query(
        'UPDATE veterinario SET estado = ? WHERE id = UUID_TO_BIN(?)',
        [estado, id]
      );
      return true;
    } catch (error) {
      console.error(`Error al actualizar estado del veterinario con ID ${id}:`, error);
      throw error;
    }
  }

  static async getByCategoria(idCategoria) {
    try {
      const [resultSets] = await pool.query("CALL sp_veterinarios_por_categoria(?)", [Number(idCategoria)]);
      return resultSets[0];
    } catch (error) {
      console.error("Error al obtener veterinarios por categoría:", error);
      throw error;
    }
  }

  static async contarPorEspecialidad() {
  try {
    const [rows] = await pool.query(`
      SELECT especialidad, COUNT(*) AS total
      FROM vista_veterinarios_especialidad
      WHERE estado = 1
      GROUP BY especialidad
    `);
    return rows;
  } catch (error) {
    console.error('Error al contar veterinarios por especialidad:', error);
    throw error;
  }
}




}
