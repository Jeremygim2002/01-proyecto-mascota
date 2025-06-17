import { createApp } from "./index.mjs";
import { UsuarioModel } from './models/mysql/usuariosModel.mjs'
import { MascotaModel } from './models/mysql/mascotasModel.mjs'
import { AsistenteModel } from './models/mysql/asistenteModel.mjs';
import { MascotaUsuarioModel } from './models/mysql/mascotaUsuarioModel.mjs';
import { VeterinarioModel } from './models/mysql/veterinariosModel.mjs';
import { ServicioModel } from './models/mysql/serviciosModel.mjs';
import { EspecialidadVeterinarioModel } from './models/mysql/especialidadVeterinarioModel.mjs';
import { CategoriaServicioModel } from './models/mysql/categoriaServicioModel.mjs';
import { TipoMascotaModel } from './models/mysql/tipoMascotaModel.mjs';
import { OrdenModel } from './models/mysql/ordenModel.mjs';



createApp({
    usuarioModel: UsuarioModel,
    mascotaModel: MascotaModel,
    asistenteModel: AsistenteModel,
    mascotaUsuarioModel: MascotaUsuarioModel,
    veterinarioModel: VeterinarioModel,
    servicioModel: ServicioModel,
    especialidadVeterinarioModel: EspecialidadVeterinarioModel,
    categoriaServicioModel: CategoriaServicioModel,
    tipoMascotaModel: TipoMascotaModel,
    ordenModel: OrdenModel
})

