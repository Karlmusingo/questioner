import { Router } from 'express';
import verifToken from '../middleware/authVerif';

const questionCtrl = require('../controllers/questionController');


const router = Router();


router.patch('/:id/upvote', verifToken, questionCtrl.upvote);
router.patch('/:id/downvote', verifToken, questionCtrl.downvote);

export default router;
