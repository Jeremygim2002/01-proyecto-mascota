import { Router } from 'express';
import { AsistenteController } from '../controllers/asistenteController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';

export function createAsistentesRouter({ asistenteModel }) {
  const router = Router();
  const asistenteController = new AsistenteController({ asistenteModel });

  router.post('/register', asistenteController.register);
  router.post('/login', asistenteController.login);
  router.post('/logout', asistenteController.logout);
  router.get('/profile', authMiddleware, asistenteController.profile);

  return router;
}
