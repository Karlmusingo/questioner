import { Router } from 'express';
import verifToken from '../middleware/authVerif';
import questionCtrl from '../controllers/questionController';
import commentCtrl from '../controllers/comment';

const router = Router();


router.patch('/:id/upvote', verifToken, questionCtrl.upvote);
router.patch('/:id/downvote', verifToken, questionCtrl.downvote);
router.post('/:id/comments', verifToken, commentCtrl.create);
router.get('/:id/comments', verifToken, commentCtrl.getComments);

export default router;
