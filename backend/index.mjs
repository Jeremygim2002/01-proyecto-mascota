import express from 'express';
import { createUsuarioRouter } from './routes/usuariosRoutes.mjs'
import { corsMiddleware } from './middlewares/cors.mjs';


export const createApp = ({ usuarioModel }) => {

  const app = express();

  const port = 3000;

  app.disable('x-powered-by');
  app.use(express.json());
  app.use(corsMiddleware());

  app.use('/usuarios', createUsuarioRouter({ usuarioModel }));

  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}




