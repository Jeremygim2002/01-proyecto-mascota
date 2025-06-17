
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateAsistente, validateLogin } from '../schemas/asistenteSchema.mjs';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'mi-clave-secreta';
const COOKIE_NAME = 'token';


let model;

export class AsistenteController {
    static injectModel(m) {
        model = m;
    }

    static async register(req, res) {
        const result = validateAsistente(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const existing = await model.findByCorreo({ correo: result.data.correo });
        if (existing) {
            return res.status(409).json({ error: 'El correo ya está registrado' });
        }

        const asistente = await model.create({ input: result.data });
        res.status(201).json({ message: 'Asistente registrado exitosamente', asistente });  
    }

    static async login(req, res) {
        const result = validateLogin(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const { correo, password } = result.data;
        const asistente = await model.findByCorreo({ correo });

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

        res.json({ message: 'Inicio de sesión exitoso' });
    }

    static async logout(req, res) {
        res.clearCookie(COOKIE_NAME);
        res.json({ message: 'Sesión cerrada exitosamente' });
    }

    static async profile(req, res) {
        const asistente = await model.findById({ id: req.user.id });
        if (!asistente) {
            return res.status(404).json({ error: 'Asistente no encontrado' });
        }
        res.json(asistente);
    }
}
