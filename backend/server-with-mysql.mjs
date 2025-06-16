import { createApp } from "./index.mjs";
import { UsuarioModel } from './models/mysql/usuariosModel.mjs'
import { MascotaModel } from './models/mysql/mascotasModel.mjs'
import { AsistenteModel } from './models/mysql/asistentesModel.mjs';
import { MascotaUsuarioModel } from './models/mysql/mascotaUsuarioModel.mjs';
import { VeterinarioModel } from './models/mysql/veterinariosModel.mjs';
import { ServicioModel } from './models/mysql/serviciosModel.mjs';
import { EspecialidadVeterinarioModel } from './models/mysql/especialidadVeterinarioModel.mjs';
import { CategoriaServicioModel } from './models/mysql/categoriaServicioModel.mjs';


createApp({
    usuarioModel: UsuarioModel,
    mascotaModel: MascotaModel,
    asistenteModel: AsistenteModel,
    mascotaUsuarioModel: MascotaUsuarioModel,
    veterinarioModel: VeterinarioModel,
    servicioModel: ServicioModel,
    especialidadVeterinarioModel: EspecialidadVeterinarioModel,
    categoriaServicioModel: CategoriaServicioModel
})

