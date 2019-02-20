import { Router } from 'express';

import userCtrl from '../controllers/userController';

const router = Router();

// authentification's routes
router.post('/signup/', userCtrl.signup);
router.post('/signin/', userCtrl.signin);

export default router;
