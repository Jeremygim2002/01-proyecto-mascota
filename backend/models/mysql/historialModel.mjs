import pool from '../../config/db.mjs';

export class HistorialModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM vista_mascota_usuario');
    return rows;
  }
}
