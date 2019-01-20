import { Router } from 'express';

const rsvpCtrl = require('../controllers/rsvpController');

const router = Router();

router.post('/meetups/:id/rsvps', rsvpCtrl.create);

export default router;