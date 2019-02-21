import { Router } from 'express';

import rsvpCtrl from '../controllers/rsvpController';

const router = Router();

router.post('/:id/rsvps', rsvpCtrl.create);

export default router;
