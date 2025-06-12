import pool from '../../config/db.mjs';

export class MascotaUsuarioModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM vista_mascota_usuario');
    return rows;
  }

  static async deleteById(id) {
  const [result] = await pool.query(
    'DELETE FROM mascotas WHERE id = UUID_TO_BIN(?)',
    [id]
  );
  return result;
}

}
