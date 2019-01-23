/* eslint-disable no-restricted-globals */
/* eslint-disable no-tabs */
import Meetup from '../models/modelMeetups';
import meetupValidation from '../middleware/meetupValidation';

module.exports = {
	getAll: async (req, res) => {
		const meetups = await Meetup.getAll();
		if (meetups) {
			res.status(200).send({
				status: 200,
				data: meetups,
			});
		} else {
			res.status(500).send({
				status: 500,
				error: 'server error',
			});
		}
	},
	create: (req, res) => {
		if (meetupValidation(req.body).length === 0) {
			const meetup = {
				location: req.body.location.trim(),
				topic: req.body.topic.trim(),
				happeningOn: new Date(req.body.happeningOn),
				tags: (req.body.tags) ? req.body.tags : [],
				images: (req.body.images) ? req.body.images : [],
			};
			Meetup.create(meetup);
			res.status(201).send({
				status: 201,
				data: [meetup],
			});
		} else {
			res.status(400).send({
				status: 400,
				error: meetupValidation(req.body),
			});
		}
	},

	getById: async (req, res) => {
		const id = parseInt(req.params.id, 10);
		if (!isNaN(id)) {
			const meetup = await Meetup.getById(id);
			if (meetup.length !== 0) {
				return res.status(200).send({
					status: 200,
					data: meetup,
				});
			}
			return res.status(404).send({
				status: 404,
				error: 'meetup not found',
			});
		} else {
			return res.status(400).send({
				status: 400,
				error: 'invalid meetup id',
			});
		}
	},

	getUpcomingMeetups: async (req, res) => {
		const upcomings = await Meetup.getUpcoming();
		if (upcomings) {
			return res.status(200).send({ status: 200, data: upcomings });
		}
		return res.status(500).send({
			status: 500,
			error: 'server error!',
		});
	},

	delete: async (req, res) => {
		const id = parseInt(req.params.id, 10);
		if (!isNaN(id)) {
			const meet = Meetup.delete(id);
			return res.status(200).send({
				status: 200,
				data: ['meetup deleted successfully!'],
			});
		}else {
			return res.status(400).send({
				status: 400,
				error: 'invalid meetup id',
			});
		}
	}
};
