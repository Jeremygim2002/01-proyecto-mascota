import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateAsistente, validateLogin } from '../schemas/asistenteSchema.mjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'token';

export class AsistenteController {
  constructor({ asistenteModel }) {
    this.model = asistenteModel;
  }

  register = async (req, res) => {
    const result = validateAsistente(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const existe = await this.model.findByCorreo({ correo: result.data.correo });
    if (existe) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    const asistente = await this.model.create({ input: result.data });
    return res.status(201).json({ message: 'Asistente registrado exitosamente', asistente });
  };

  login = async (req, res) => {
    const result = validateLogin(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const { correo, password } = result.data;
    const asistente = await this.model.findByCorreo({ correo });

    if (!asistente) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, asistente.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: asistente.id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return res.json({ message: 'Inicio de sesión exitoso' });
  };

  logout = (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ message: 'Sesión cerrada exitosamente' });
  };

  profile = async (req, res) => {
    const asistente = await this.model.findById({ id: req.user.id });
    if (!asistente) {
      return res.status(404).json({ error: 'Asistente no encontrado' });
    }
    res.json(asistente);
  };
}
