import { createApp } from "./index.mjs";
import { UsuarioModel } from './models/mysql/usuariosModel.mjs'
import { MascotaModel } from './models/mysql/mascotasModel.mjs'
import { AsistenteModel } from './models/mysql/asistentesModel.mjs';

createApp({
    usuarioModel: UsuarioModel,
    mascotaModel: MascotaModel,
    asistenteModel: AsistenteModel 
})

