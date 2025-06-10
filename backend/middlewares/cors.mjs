import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3030',     
  'http://localhost:5173',
  'http://127.0.0.1:5500',                 
  'http://localhost:5500'
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    console.log('[CORS] Origin recibido:', origin);
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      console.log('[CORS] PERMITIDO');
      callback(null, true);
    } else {
      console.log('[CORS] BLOQUEADO');
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
});
