// cors.mjs
import cors from 'cors';

const ACCEPTED_ORIGINS = new Set([
  'http://localhost:8080',
  'http://localhost:3030',
  'http://localhost:5173',
  'http://localhost:5174'
]);

function isOriginAllowed(origin) {
  return !origin || ACCEPTED_ORIGINS.has(origin);
}

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
});
