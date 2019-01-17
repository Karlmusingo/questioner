const express=require("express");
const router=express.Router();

//@controller
const meetupCtrl=require("../controllers/meetupController");
const questionCtrl = require("../controllers/questionController");
const rsvpCtrl = require("../controllers/rsvpController");
//intial 

//meetup's routes
router.get("/meetups/",meetupCtrl.getAll);
router.post('/meetups', meetupCtrl.create);
router.get('/meetups/:id', meetupCtrl.getById);
router.get('/meetups/upcoming/all', meetupCtrl.getUpcomingMeetups);


//question's routes
router.post('/meetups/:id/questions', questionCtrl.create);
router.patch('/questions/:id/upvote', questionCtrl.upvote);
router.patch('/questions/:id/downvote', questionCtrl.downvote);
router.get('/meetups/:id/questions', questionCtrl.getQuestionsForASpecificMeetup);

//rsvp's routes
router.post('/meetups/:id/rsvps', rsvpCtrl.create);


module.exports=router;