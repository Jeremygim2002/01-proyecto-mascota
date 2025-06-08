import { Router } from 'express';
import { AsistenteController } from '../controllers/asistenteController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';

export function createAsistentesRouter({ asistenteModel }) {
  AsistenteController.injectModel(asistenteModel); 

  const router = Router();
  router.post('/register', AsistenteController.register);
  router.post('/login', AsistenteController.login);
  router.post('/logout', AsistenteController.logout);
  router.get('/profile', authMiddleware, AsistenteController.profile);

  return router;
}
