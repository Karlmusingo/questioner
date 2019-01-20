import { Router } from 'express';

const meetupCtrl = require('../controllers/meetupController');
const questionCtrl = require('../controllers/questionController');
const rsvpCtrl = require('../controllers/rsvpController');

const router = Router();

// meetup's routes
router.get('/', meetupCtrl.getAll);
router.post('/', meetupCtrl.create);
router.get('/upcoming/', meetupCtrl.getUpcomingMeetups);
router.get('/:id', meetupCtrl.getById);
router.get('/:id/questions', questionCtrl.getQuestionsForASpecificMeetup);
router.post('/:id/questions', questionCtrl.create);
router.post('/:id/rsvps', rsvpCtrl.create);

export default router;