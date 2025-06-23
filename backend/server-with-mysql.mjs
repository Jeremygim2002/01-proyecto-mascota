import { createApp } from "./index.mjs";
import { UsuarioModel } from './models/mysql/usuarioModel.mjs'
import { MascotaModel } from './models/mysql/mascotaModel.mjs'
import { AsistenteModel } from './models/mysql/asistenteModel.mjs';
import { CompuestoModel } from './models/mysql/compuestoModel.mjs';
import { VeterinarioModel } from './models/mysql/veterinarioModel.mjs';
import { ServicioModel } from './models/mysql/servicioModel.mjs';
import { EspecialidadVeterinarioModel } from './models/mysql/especialidadVeterinarioModel.mjs';
import { CategoriaServicioModel } from './models/mysql/categoriaServicioModel.mjs';
import { TipoMascotaModel } from './models/mysql/tipoMascotaModel.mjs';
import { OrdenModel } from './models/mysql/ordenModel.mjs';
import { EspecialidadCategoriaModel } from './models/mysql/especialidadCategoriaModel.mjs';

createApp({
    usuarioModel: UsuarioModel,
    mascotaModel: MascotaModel,
    asistenteModel: AsistenteModel,
    compuestoModel: CompuestoModel,
    veterinarioModel: VeterinarioModel,
    servicioModel: ServicioModel,
    especialidadVeterinarioModel: EspecialidadVeterinarioModel,
    categoriaServicioModel: CategoriaServicioModel,
    tipoMascotaModel: TipoMascotaModel,
    ordenModel: OrdenModel,
    especialidadCategoriaModel: EspecialidadCategoriaModel
})

