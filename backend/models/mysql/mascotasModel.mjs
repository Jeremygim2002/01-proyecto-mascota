import pool from '../../config/db.mjs';

export class MascotaModel {
  static async getAll() {
    try {
      const [mascotas] = await pool.query('SELECT * FROM vista_mascotas');
      return mascotas;
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      throw error;
    }
  }

  static async getById({ id }) {
    try {
      const [[mascota]] = await pool.query(
        'SELECT * FROM vista_mascotas WHERE id = ?',
        [id]
      );
      return mascota || null;
    } catch (error) {
      console.error(`Error al obtener mascota con ID ${id}:`, error);
      throw error;
    }
  }


  static async exists({ nombre, id_usuario }) {
    const [rows] = await pool.query(`
    SELECT 1 FROM mascotas 
    WHERE nombre = ? AND id_usuario = UUID_TO_BIN(?) 
    LIMIT 1
  `, [nombre, id_usuario]);

    return rows.length > 0;
  }

  static async create({ input }) {
    const { nombre, raza, edad, sexo, estado, imagen, id_usuario, id_tipo_mascota } = input;

    const yaExiste = await this.exists({ nombre, id_usuario });
    if (yaExiste) {
      const error = new Error('Ya existe una mascota con ese nombre para este usuario.');
      error.status = 409;
      throw error;
    }

    await pool.query(
      `CALL sp_insertar_mascota(?, ?, ?, ?, ?, ?, UUID_TO_BIN(?), ?)`,
      [nombre, raza, edad, sexo, estado, imagen, id_usuario, id_tipo_mascota]
    );

    return { nombre, raza, edad, sexo, estado, imagen, id_usuario, id_tipo_mascota };
  }


  static async update({ id, input }) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(input)) {
      if (key === 'id_usuario') {
        fields.push(`${key} = UUID_TO_BIN(?)`);
      } else {
        fields.push(`${key} = ?`);
      }
      values.push(value);
    }

    const sql = `UPDATE mascotas SET ${fields.join(', ')} WHERE id = UUID_TO_BIN(?)`;
    values.push(id);

    await pool.query(sql, values);
  }


  static async delete({ id }) {
    try {
      await pool.query('CALL sp_eliminar_mascota(UUID_TO_BIN(?))', [id]);
      return true;
    } catch (error) {
      console.error(`Error al eliminar mascota con ID ${id}:`, error);
      throw error;
    }
  }

  static async updateEstado({ id, estado }) {
    try {
      await pool.query(
        'UPDATE mascotas SET estado = ? WHERE id = UUID_TO_BIN(?)',
        [estado, id]
      );
      return true;
    } catch (error) {
      console.error(`Error actualizando estado de mascota ${id}:`, error);
      throw error;
    }
  }
}
