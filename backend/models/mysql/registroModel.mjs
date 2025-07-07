
import pool from '../../config/db.mjs';

export class RegistroModel {
  static async getRecientes(limit = 10) {
    const [rows] = await pool.query(
      `SELECT r.accion, r.descripcion, DATE_FORMAT(r.fecha_hora, '%Y-%m-%d %H:%i') AS fecha,
        a.nombre AS asistente
       FROM registro r
       LEFT JOIN asistente a ON r.id_asistente = a.id
       ORDER BY r.fecha_hora DESC
       LIMIT ?`, [limit]);
    return rows;
  }
}
