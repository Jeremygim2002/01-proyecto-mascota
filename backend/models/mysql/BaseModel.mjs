import pool from '../../config/db.mjs';

export class BaseModel {
  constructor(tableName) {
    this.table = tableName;
  }

  async getAll() {
    const [rows] = await pool.query(`SELECT BIN_TO_UUID(id) AS id, * FROM ${this.table}`);
    return rows;
  }

  async getById({ id }) {
    const [[row]] = await pool.query(
      `SELECT BIN_TO_UUID(id) AS id, * FROM ${this.table} WHERE id = UUID_TO_BIN(?)`,
      [id]
    );
    return row || null;
  }

  async delete({ id }) {
    const [result] = await pool.query(
      `DELETE FROM ${this.table} WHERE id = UUID_TO_BIN(?)`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
