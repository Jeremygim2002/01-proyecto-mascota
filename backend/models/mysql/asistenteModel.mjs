import pool from '../../config/db.mjs';
import bcrypt from 'bcrypt';

function uuidToBin(uuid) {
    return Buffer.from(uuid.replace(/-/g, ''), 'hex');
}

export class AsistenteModel {
  static async create({ input }) {
    const { nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password } = input;
    const [[{ uuid }]] = await pool.query('SELECT UUID() AS uuid');
    const password_hash = await bcrypt.hash(password, 10);

    try {
      await pool.query('CALL sp_crear_asistente(?, ?, ?, ?, ?, ?, ?, ?)', [
        uuidToBin(uuid),
        nombre, apellido_paterno, apellido_materno,
        correo, numero_telefono, dni, password_hash
      ]);
      return { id: uuid, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni };
    } catch (err) {
      console.error('📌 ERROR al crear asistente:', err);
      throw err; 
    }
  }

    static async findByCorreo({ correo }) {
        const [resultSets] = await pool.query('CALL sp_buscar_asistente_por_correo(?)', [correo]);
        const rows = resultSets[0];
        return rows.length > 0 ? rows[0] : null;
    }

    static async findById({ id }) {
        const [[asistente]] = await pool.query('CALL sp_buscar_asistente_por_id(?)', [
            uuidToBin(id)
        ]);
        return asistente[0] || null;
    }
}
