import pool from '../../config/db.mjs';

// GET ALL
export const getUsuarios = async () => {
  const [usuarios] = await pool.query('SELECT * FROM usuarios');
  return usuarios;
};

// GET BY ID
export const getUsuarioById = async (id) => {
  const [[usuario]] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return usuario || null;
};

// CREATE
export const createUsuario = async (data) => {
  const {
    nombre, apellido_paterno, apellido_materno,
    correo, numero_telefono, dni
  } = data;

  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni]
  );

  return {
    id: result.insertId,
    nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni
  };
};

// UPDATE
export const updateUsuario = async (id, data) => {
  const {
    nombre, apellido_paterno, apellido_materno,
    correo, numero_telefono, dni
  } = data;

  await pool.query(
    'UPDATE usuarios SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, correo = ?, numero_telefono = ?, dni = ? WHERE id = ?',
    [nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, id]
  );
};

// DELETE
export const deleteUsuario = async (id) => {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
