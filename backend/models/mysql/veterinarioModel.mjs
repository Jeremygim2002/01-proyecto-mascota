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
      const [rows] = await pool.query(
        `SELECT 
  BIN_TO_UUID(v.id) AS id_veterinario,
  CONCAT(v.nombre, ' ', v.apellido_paterno, ' ', v.apellido_materno) AS nombre
FROM veterinario v
JOIN tipo_especialidad te ON v.id_especialidad = te.id
JOIN especialidad_categorias ec ON ec.id_especialidad = te.id
WHERE ec.id_categoria = ? AND v.estado = TRUE`,
        [idCategoria]
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener veterinarios por categoría:', error);
      throw error;
    }
  }

}
