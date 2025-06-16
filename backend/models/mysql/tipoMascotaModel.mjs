import pool from '../../config/db.mjs';

export class TipoMascotaModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT id, nombre FROM tipo_mascota');
    return rows;
  }
}
