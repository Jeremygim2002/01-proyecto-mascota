import express from 'express';
import { createUsuarioRouter } from './routes/usuariosRoutes.mjs'
import { createMascotasRouter } from './routes/mascotasRoutes.mjs'
import { createAsistentesRouter } from './routes/asistentesRoutes.mjs';
import { createMascotaUsuarioRouter } from './routes/mascotaUsuarioRoutes.mjs';
import { corsMiddleware } from './middlewares/cors.mjs';
import cookieParser from 'cookie-parser';
import 'module-alias/register' 


export const createApp = ({ usuarioModel, mascotaModel, asistenteModel, mascotaUsuarioModel }) => {

  const app = express();

  const port = 3000;

  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(corsMiddleware);
  app.use(express.json());

  app.use('/api/usuarios', createUsuarioRouter({ usuarioModel }));
  app.use('/api/mascotas', createMascotasRouter({ mascotaModel }));
  app.use('/api/asistentes', createAsistentesRouter({ asistenteModel }));
  app.use('/api/mascota-usuario', createMascotaUsuarioRouter({ mascotaUsuarioModel }));



  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  return app;
}




