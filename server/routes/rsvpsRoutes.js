import { Router } from 'express';

const rsvpCtrl = require('../controllers/rsvpController');

const router = Router();

router.post('/:id/rsvps', rsvpCtrl.create);

export default router;
