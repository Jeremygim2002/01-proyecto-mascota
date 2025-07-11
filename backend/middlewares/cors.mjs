import cors from 'cors';

const origenesAceptados = new Set([
  'http://localhost:8080',
  'http://localhost:3030',
  'http://localhost:5173',
  'http://localhost:5174'
]);

function origenPermitido(origin) {
  return !origin || origenesAceptados.has(origin);
}

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (origenPermitido(origin)) {
      return callback(null, true);
    }
    return callback(new Error('No permitido por el cors'));
  },
  credentials: true,
  optionsSuccessStatus: 200
});



