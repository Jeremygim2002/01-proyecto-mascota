import pool from '../../config/db.mjs';

export class UsuarioModel {
  static async getAll() {
    try {
      const [usuarios] = await pool.query('SELECT * FROM vista_usuarios');
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  static async getById({ id }) {
    try {
      const [[usuario]] = await pool.query(
        'SELECT * FROM vista_usuarios WHERE id = ?',
        [id]
      );
      return usuario || null;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  }

  static async getByDni({ dni }) {
    try {
      const [[usuario]] = await pool.query(
        'SELECT * FROM vista_usuarios WHERE dni = ?',
        [dni]
      );
      return usuario || null;
    } catch (error) {
      console.error(`Error al buscar usuario por DNI ${dni}:`, error);
      throw error;
    }
  }

  static async create({ input }) {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      numero_telefono,
      dni
    } = input;

    try {
      const [[{ uuid }]] = await pool.query('SELECT UUID() AS uuid');

      await pool.query(
        'CALL sp_insertar_usuario(?, ?, ?, ?, ?, ?)',
        [nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni]
      );

      return {
        id: uuid,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        numero_telefono,
        dni
      };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  static async update({ id, input }) {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      numero_telefono,
      dni
    } = input;

    try {
      await pool.query(
        'CALL sp_actualizar_usuario(UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)',
        [id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni]
      );
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw error;
    }
  }

  static async delete({ id }) {
    try {
      const [result] = await pool.query(
        'CALL sp_eliminar_usuario(UUID_TO_BIN(?))',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      throw error;
    }
  }

  static async getUsuarioConMascotasByDni(dni) {
    try {
      const [[usuario]] = await pool.query(
        'SELECT BIN_TO_UUID(id) AS id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni FROM usuarios WHERE dni = ?',
        [dni]
      );

      if (!usuario) return null;

      const [mascotas] = await pool.query(
        `SELECT 
         BIN_TO_UUID(m.id) AS id_mascota,
         m.nombre AS nombre_mascota,
         m.raza,
         m.edad,
         m.sexo,
         m.estado
       FROM mascotas m
       JOIN usuarios u ON m.id_usuario = u.id
       WHERE u.dni = ?`,
        [dni]
      );

      return {
        usuario,
        mascotas
      };
    } catch (error) {
      console.error('Error al obtener usuario y mascotas por DNI:', error);
      throw error;
    }
  }
}
