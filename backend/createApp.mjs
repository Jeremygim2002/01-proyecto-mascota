
// createApp.mjs
import express from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/cors.mjs';

// Rutas
import { createUsuarioRouter } from './routes/usuariosRoutes.mjs';
import { createMascotasRouter } from './routes/mascotasRoutes.mjs';
import { createAsistentesRouter } from './routes/asistentesRoutes.mjs';
import { createCompuestoRouter } from './routes/compuestoRoutes.mjs';
import { createVeterinariosRouter } from './routes/veterinariosRoutes.mjs';
import { createServiciosRouter } from './routes/serviciosRoutes.mjs';
import { createEspecialidadesRouter } from './routes/especialidadesVeterinarioRoutes.mjs';
import { createCategoriaServicioRouter } from './routes/categoriasServicioRoutes.mjs';
import { createTipoMascotaRouter } from './routes/tiposMascotaRoutes.mjs';
import { createOrdenesRouter } from './routes/ordenesRoutes.mjs';
import { createEspecialidadesCategoriaRouter } from './routes/especialidadesCategoriaRoutes.mjs';

export const createApp = ({ usuarioModel, mascotaModel, asistenteModel, compuestoModel, veterinarioModel, servicioModel, especialidadVeterinarioModel, categoriaServicioModel, tipoMascotaModel, ordenModel, especialidadCategoriaModel }) => {

  const app = express();

  // Middlewares base
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(corsMiddleware);
  app.use(express.json());

  app.use('/api/usuarios', createUsuarioRouter({ usuarioModel }));
  app.use('/api/mascotas', createMascotasRouter({ mascotaModel }));
  app.use('/api/asistentes', createAsistentesRouter({ asistenteModel }));
  app.use('/api/mascota-usuario', createCompuestoRouter({ compuestoModel }));
  app.use('/api/veterinarios', createVeterinariosRouter({ veterinarioModel }));
  app.use('/api/servicios', createServiciosRouter({ servicioModel }));
  app.use('/api/especialidades', createEspecialidadesRouter({ especialidadVeterinarioModel }));
  app.use('/api/categorias-servicio', createCategoriaServicioRouter({ categoriaServicioModel }));
  app.use('/api/tipos-mascota', createTipoMascotaRouter({ tipoMascotaModel }));
  app.use('/api/ordenes', createOrdenesRouter({ ordenModel }));
  app.use('/api/especialidad-categorias', createEspecialidadesCategoriaRouter({ especialidadCategoriaModel }));

  return app;
}




