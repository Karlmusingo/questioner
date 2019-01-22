import { Router } from 'express';
import verifToken from '../middleware/authVerif';
import verifAdmin from '../middleware/verifAdmin';

const meetupCtrl = require('../controllers/meetupController');
const questionCtrl = require('../controllers/questionController');
const rsvpCtrl = require('../controllers/rsvpController');

const router = Router();

// meetup's routes
router.get('/', verifToken, meetupCtrl.getAll);
router.post('/', verifToken, verifAdmin, meetupCtrl.create);
router.get('/upcoming/', verifToken, meetupCtrl.getUpcomingMeetups);
router.get('/:id', verifToken, meetupCtrl.getById);
router.get('/:id/questions', verifToken, questionCtrl.getQuestionsForASpecificMeetup);
router.post('/:id/questions', verifToken, questionCtrl.create);
router.post('/:id/rsvps', verifToken, rsvpCtrl.create);

export default router;
