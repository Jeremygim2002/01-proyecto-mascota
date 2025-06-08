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

  static async create({ input }) {
    const { nombre, raza, edad, sexo, id_usuario } = input;
    const [[{ uuid }]] = await pool.query('SELECT UUID() AS uuid');

    await pool.query(
      `INSERT INTO mascotas (
        id, nombre, raza, edad, sexo, id_usuario
      ) VALUES (
        UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?)
      )`,
      [uuid, nombre, raza, edad, sexo, id_usuario]
    );

    return { id: uuid, nombre, raza, edad, sexo, id_usuario };
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
      const [result] = await pool.query(
        'DELETE FROM mascotas WHERE id = UUID_TO_BIN(?)',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar mascota con ID ${id}:`, error);
      throw error;
    }
  }
}
