
//  usanod la base de datos
// import * as usuariosModel from '../models/mysql/usuariosModel.mjs';


// Ahora (usando archivos locales):
import * as usuariosModel from '../models/local-file-system/usuariosModel.mjs';


export const getAll = async (req, res) => {
  const usuarios = await usuariosModel.getUsuarios();
  res.json(usuarios);
};

export const getById = async (req, res) => {
  const usuario = await usuariosModel.getUsuarioById(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

export const create = async (req, res) => {
  const nuevo = await usuariosModel.createUsuario(req.body);
  res.status(201).json(nuevo);
};

export const update = async (req, res) => {
  const existe = await usuariosModel.getUsuarioById(req.params.id);
  if (!existe) return res.status(404).json({ error: 'Usuario no encontrado' });
  await usuariosModel.updateUsuario(req.params.id, req.body);
  res.json({ message: 'Usuario actualizado' });
};

export const remove = async (req, res) => {
  const existe = await usuariosModel.getUsuarioById(req.params.id);
  if (!existe) return res.status(404).json({ error: 'Usuario no encontrado' });
  await usuariosModel.deleteUsuario(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};
