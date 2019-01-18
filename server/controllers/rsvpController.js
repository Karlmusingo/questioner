const db = require('../models/db.js');

module.exports = {
	create:(req,res)=>{
		const id = parseInt(req.params.id);
		let flag = false;

		if(isNaN(req.params.id)){
			return res.status(400).send({
				status: 400,
				error: 'Invalid meetup'
			});
		} if(!req.body.user || req.body.user.trim() === ''){
			return res.status(400).send({
				status: 400,
				error: 'the user property is required in order to send an RSVP'
			});
		} else if(!(db.users.find(u => u.id === parseInt(req.body.user))))  {
			return res.status(400).send({
				status: 404,
				error: 'the user  is not found'
			});
		}else if (!req.body.status || req.body.user.trim() === '') {
			return res.status(400).send({
				status: 400,
				error: 'the status property is required in order to send an RSVP'
			});
		}else if(!(req.body.status === 'yes' || req.body.status === 'no' || req.body.status === 'maybe' )){
			return res.status(400).send({
				status: 400,
				error: 'invalid value of status'
			});
		}

		db.meetups.forEach(function (meetup) {
			if(meetup.id === id){
				flag = true;
				const rsvp = {
					id : db.rsvps.length + 1,
					meetup : meetup.id,
					user: parseInt(req.body.user),
					status: req.body.status
				};
				db.rsvps.push(rsvp);

				return res.status(201).send({
					status: 201,
					data: [{
						meetup: rsvp.meetup,
						topic: meetup.topic,
						status: rsvp.status
					}]
				});
			}
		});

		if(!flag){
			return res.status(404).send({
				status: 404,
				error: 'the meetup id provided is not found'
			});
		}
		
	}
}