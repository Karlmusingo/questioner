/* eslint-disable no-restricted-globals */
/* eslint-disable no-tabs */
import meetups from '../models/modelMeetups';


module.exports = {
	getAll: (req, res) => {
		res.status(200).send({
			status: 200,
			data: meetups,
		});
	},

	create: (req, res) => {
		if (!req.body.location || req.body.location.trim() === '') {
			return res.status(400).send({
				status: 400,
				error: 'location property is required for the meetup',
			});
		} if (!req.body.topic || req.body.topic.trim() === '') {
			return res.status(400).send({
				status: 400,
				error: 'topic property is required for the meetup',
			});
		} if (!req.body.happeningOn || req.body.happeningOn.trim() === '') {
			return res.status(400).send({
				status: 400,
				error: 'happeningOn property is required for the meetup',
			});
		} if ((new Date(req.body.happeningOn.trim())) <= (new Date())) {
			return res.status(400).send({
				status: 400,
				error: 'happeningOn must come after today',
			});
		} if (isNaN(new Date(req.body.happeningOn.trim()))) {
			return res.status(400).send({
				status: 400,
				error: 'happeningOn is not a valide Date',
			});
		}

		// if(errors){
		// 	return res.status(400).send({
		// 		status: 400,
		// 		error: errors,
		// 	});
		// }

		const meetup = {
			id: meetups.length + 1,
			createdOn: new Date(),
			location: req.body.location.trim(),
			topic: req.body.topic.trim(),
			happeningOn: new Date(req.body.happeningOn),
			tags: req.body.tags,
		};
		meetups.push(meetup);
		return res.status(201).send({
			status: 201,
			data: [meetup],
		});
	},

	getById: (req, res) => {
		const id = parseInt(req.params.id, 10);
		let flag = false;

		meetups.forEach((meetup) => {
			if (meetup.id === id) {
				flag = true;
				return res.status(200).send({
					status: 200,
					data: [{
						id: meetup.id,
						topic: meetup.topic,
						location: meetup.location,
						happeningOn: meetup.happeningOn,
						tags: meetup.tags,
					}],
				});
			}
		});

		if (!flag) {
			return res.status(404).send({
				status: 404,
				error: 'meetup not found',
			});
		}
	},

	getUpcomingMeetups: (req, res) => {
		const today = new Date();
		const upcomings = [];
		meetups.forEach((meetup) => {
			if (meetup.happeningOn > today) {
				upcomings.push(meetup);
			}
		});
		return res.status(200).send({ status: 200, data: upcomings });
	},
};
