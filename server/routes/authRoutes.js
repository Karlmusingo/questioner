import { Router } from 'express';

const userCtrl = require('../controllers/userController');

const router = Router();

// authentification's routes
router.post('/signup/', userCtrl.signup);
router.post('/signin/', userCtrl.signin);

router.get('/', (req, res) => {
    res.send({
        message: 'welcome to auth',
    });
} );
export default router;
