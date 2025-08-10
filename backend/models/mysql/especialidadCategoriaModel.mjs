import pool from '../../config/db.mjs';

export class EspecialidadCategoriaModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM vista_especialidad_categoria');
    return rows;
  }
}
