import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const filePath = join(process.cwd(), 'data', 'usuarios.json');

const readUsuarios = async () => {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Si no existe el archivo o está vacío
  }
};

const writeUsuarios = async (usuarios) => {
  await writeFile(filePath, JSON.stringify(usuarios, null, 2));
};

export const getUsuarios = async () => {
  return await readUsuarios();
};

export const getUsuarioById = async (id) => {
  const usuarios = await readUsuarios();
  return usuarios.find((u) => u.id === id);
};

export const createUsuario = async (usuario) => {
  const usuarios = await readUsuarios();
  const nuevo = { id: randomUUID(), ...usuario };
  usuarios.push(nuevo);
  await writeUsuarios(usuarios);
  return nuevo;
};

export const updateUsuario = async (id, data) => {
  const usuarios = await readUsuarios();
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) return null;
  usuarios[index] = { ...usuarios[index], ...data };
  await writeUsuarios(usuarios);
  return usuarios[index];
};

export const deleteUsuario = async (id) => {
  let usuarios = await readUsuarios();
  const originalLength = usuarios.length;
  usuarios = usuarios.filter((u) => u.id !== id);
  if (usuarios.length === originalLength) return false;
  await writeUsuarios(usuarios);
  return true;
};
