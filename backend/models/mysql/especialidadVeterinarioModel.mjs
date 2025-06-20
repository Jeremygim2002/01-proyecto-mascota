import pool from '../../config/db.mjs';

export class EspecialidadVeterinarioModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT id, nombre FROM tipo_especialidad');
    return rows;
  }
}