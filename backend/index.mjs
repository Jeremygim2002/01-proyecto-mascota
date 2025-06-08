import express from 'express';
import { createUsuarioRouter } from './routes/usuariosRoutes.mjs'
import { createMascotasRouter } from './routes/mascotasRoutes.mjs'
import { createAsistentesRouter } from './routes/asistentesRoutes.mjs';
import { corsMiddleware } from './middlewares/cors.mjs';
import cookieParser from 'cookie-parser';

export const createApp = ({ usuarioModel, mascotaModel, asistenteModel }) => {

  const app = express();

  const port = 3000;

  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(corsMiddleware);
  app.use(express.json());

  app.use('/api/usuarios', createUsuarioRouter({ usuarioModel }));
  app.use('/api/mascotas', createMascotasRouter ({ mascotaModel }))
  app.use('/api/asistentes', createAsistentesRouter({ asistenteModel }));

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  return app;
}




