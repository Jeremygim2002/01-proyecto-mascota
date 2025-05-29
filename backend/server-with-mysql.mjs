import { createApp } from "./index.mjs";
import { UsuarioModel } from './models/mysql/usuariosModel.mjs'

createApp({ usuarioModel: UsuarioModel })
