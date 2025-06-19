import pool from '../../config/db.mjs';

export class EspecialidadVeterinarioModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM vista_especialidades');
    return rows;
  }
}