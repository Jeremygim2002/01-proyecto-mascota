import pool from '../../config/db.mjs';
import bcrypt from 'bcrypt';

export class AsistenteModel {
    static async create({ input }) {
        const { nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password } = input;
        const [[{ uuid }]] = await pool.query('SELECT UUID() AS uuid');
        const password_hash = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO asistente (
    id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password_hash
  ) VALUES (
    UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?
  )`,
            [uuid, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password_hash]
        );

        return { id: uuid, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni };
    }

    static async findByCorreo({ correo }) {
        const [[asistente]] = await pool.query(
            'SELECT BIN_TO_UUID(id) AS id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password_hash FROM asistente WHERE correo = ?',
            [correo]
        );
        return asistente || null;
    }

    static async findById({ id }) {
        const [[asistente]] = await pool.query(
            'SELECT BIN_TO_UUID(id) AS id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni FROM asistente WHERE id = UUID_TO_BIN(?)',
            [id]
        );
        return asistente || null;
    }
}
