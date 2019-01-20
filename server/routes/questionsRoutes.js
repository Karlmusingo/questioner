import { Router } from 'express';

const questionCtrl = require('../controllers/questionController');

const router = Router();


router.patch('/:id/upvote', questionCtrl.upvote);
router.patch('/:id/downvote', questionCtrl.downvote);

export default router;