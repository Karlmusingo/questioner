const db = require('../models/db.js');

module.exports = {
	getAll:(req,res)=>{
		const data = [];
		db.meetups.forEach(function(meetup) {
			data.push({
				id: meetup.id,
				location: meetup.location,
				topic: meetup.topic,
				happeningOn: meetup.happeningOn,
				tags: meetup.tags
			});
		});
		res.status(200).send({
			status: 200,
			data: data
		})
	},

	create: (req, res) => {
		if(!req.body.location) {
			return res.status(400).send({
				status: 400,
				error: 'location property is required for the meetup'
			});
		} else if(!req.body.topic) {
			return res.status(400).send({
				status: 400,
				error: 'topic property is required for the meetup'
			});
		}else if(!req.body.happeningOn){
			return res.status(400).send({
				status: 400,
				error: 'happeningOn property is required for the meetup'
			});
		}
		const meetup = {
			id: db.meetups.length + 1,
			createdOn: new Date(),
			location: req.body.location,
			topic: req.body.topic,
			happeningOn: new Date(req.body.happeningOn)
		}
		db.meetups.push(meetup);
		return res.status(201).send({
			status: 201,
			data: [meetup]
		})
	},

	getById: (req, res) => {
		const id = parseInt(req.params.id, 10);
		let flag = false;

		db.meetups.forEach(function(meetup){
			if(meetup.id === id){
				flag = true;
				return res.status(200).send({
					status: 200,
					data: [{
						id: meetup.id,
						topic: meetup.topic,
						location: meetup.location,
						happeningOn: meetup.happeningOn,
						tags: meetup.tags
					}]
				})
			}
		});

		if (!flag) {
			return res.status(404).send({
				status: 404,
				error: 'meetup not found'
			});
		}
		
	}, 

	getUpcomingMeetups: (req, res) => {
		var today = new Date();
		const upcomings = [];
		db.meetups.forEach((meetup) => {
			if(meetup.happeningOn > today){
				upcomings.push(meetup);
			}
		});
		res.status(200).send({
			status: 200,
			data: upcomings
		});
	}
}