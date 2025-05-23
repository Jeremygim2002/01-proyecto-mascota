import express from 'express';
import cors from './middlewares/cors.mjs';
import usuariosRoutes from './routes/usuariosRoutes.mjs';

const app = express();
app.use(cors);
app.use(express.json());
app.disable('x-powered-by');

app.use('/api/usuarios', usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
