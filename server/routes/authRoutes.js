import { Router } from 'express';

const userCtrl = require('../controllers/userController');

const router = Router();

// authentification's routes
router.post('/signup/', userCtrl.signup);
router.post('/signin/', userCtrl.signin);

export default router;
