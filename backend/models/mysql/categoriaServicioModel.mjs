import pool from '../../config/db.mjs';

export class CategoriaServicioModel {
  static async getAll() {
    const [rows] = await pool.query('SELECT id, nombre FROM categorias_servicio');
    return rows;
  }
}
