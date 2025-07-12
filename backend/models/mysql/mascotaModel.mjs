import pool from "../../config/db.mjs";

export class MascotaModel {
  static async getAll() {
    try {
      const [mascotas] = await pool.query("SELECT * FROM vista_mascotas");
      return mascotas;
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
      throw error;
    }
  }

  static async getById({ id }) {
    try {
      const [[mascota]] = await pool.query(
        "SELECT * FROM vista_mascotas WHERE id = ?",
        [id]
      );
      return mascota || null;
    } catch (error) {
      console.error(`Error al obtener mascota con ID ${id}:`, error);
      throw error;
    }
  }

  static async exists({ nombre, id_usuario }) {
    const [rows] = await pool.query(
      `
    SELECT 1 FROM mascotas 
    WHERE nombre = ? AND id_usuario = UUID_TO_BIN(?) 
    LIMIT 1
  `,
      [nombre, id_usuario]
    );

    return rows.length > 0;
  }

  static async create({ input }) {
    const {
      nombre,
      raza,
      edad,
      sexo,
      estado,
      imagen,
      id_usuario,
      id_tipo_mascota,
    } = input;

    const yaExiste = await this.exists({ nombre, id_usuario });
    if (yaExiste) {
      const error = new Error(
        "Ya existe una mascota con ese nombre para este usuario."
      );
      error.status = 409;
      throw error;
    }

    await pool.query(
      `CALL sp_insertar_mascota(?, ?, ?, ?, ?, ?, UUID_TO_BIN(?), ?)`,
      [nombre, raza, edad, sexo, estado, imagen, id_usuario, id_tipo_mascota]
    );

    return {
      nombre,
      raza,
      edad,
      sexo,
      estado,
      imagen,
      id_usuario,
      id_tipo_mascota,
    };
  }

  static async update({ id, input }) {
    const {
      nombre,
      raza,
      edad,
      sexo,
      estado,
      imagen,
      id_usuario,
      id_tipo_mascota,
    } = input;

    await pool.query(
      `CALL sp_actualizar_mascota(UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?), ?)`,
      [
        id,
        nombre,
        raza,
        edad,
        sexo,
        estado,
        imagen,
        id_usuario,
        id_tipo_mascota,
      ]
    );
  }

  static async delete({ id }) {
    try {
      await pool.query("CALL sp_eliminar_mascota(UUID_TO_BIN(?))", [id]);
      return true;
    } catch (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return false;
      }

      console.error(`Error al eliminar mascota con ID ${id}:`, error);
      throw error;
    }
  }

  static async updateEstado({ id, estado }) {
    try {
      await pool.query(
        "UPDATE mascotas SET estado = ? WHERE id = UUID_TO_BIN(?)",
        [estado, id]
      );
      return true;
    } catch (error) {
      console.error(`Error actualizando estado de mascota ${id}:`, error);
      throw error;
    }
  }

  static async getActivasPorUsuarioDni({ dni }) {
    const [[usuario]] = await pool.query(
      `SELECT id FROM usuarios WHERE dni = ?`,
      [dni]
    );

    if (!usuario) return { usuario: null, mascotas: [] };

    const [mascotas] = await pool.query(
      `SELECT 
        BIN_TO_UUID(id) AS id_mascota, 
        nombre AS nombre_mascota 
     FROM mascotas 
     WHERE id_usuario = ? AND estado = TRUE`,
      [usuario.id]
    );

    return { usuario, mascotas };
  }

  static async contarActivas() {
    try {
      const [[{ total }]] = await pool.query(
        "SELECT COUNT(*) AS total FROM mascotas WHERE estado = 1"
      );
      return total;
    } catch (error) {
      console.error("Error al contar mascotas activas:", error);
      throw error;
    }
  }
}
