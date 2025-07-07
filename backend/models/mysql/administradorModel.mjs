import pool from '../../config/db.mjs';

export class AdministradorModel {
  static async getAll() {
    const [rows] = await pool.query(
      'SELECT BIN_TO_UUID(id) AS id, nombre, apellido_paterno, apellido_materno, correo, password_hash, distrito FROM administrador'
    );
    return rows;
  }
}
