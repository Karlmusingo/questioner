/* eslint-disable no-tabs */
import users from '../models/modelUsers';
import meetups from '../models/modelMeetups';
import rsvps from '../models/modelRsvps';

module.exports = {
	create: (req, res) => {
		const id = parseInt(req.params.id, 10);
		let flag = false;

		// eslint-disable-next-line no-restricted-globals
		if (isNaN(req.params.id)) {
			return res.status(400).send({
				status: 400,
				error: 'Invalid meetup',
			});
		} if (typeof parseInt(req.body.user, 10) !== 'number') {
			return res.status(400).send({
				status: 400,
				error: 'the user property is required in order to send an RSVP',
			});
		} if (!(users.find(u => u.id === parseInt(req.body.user, 10)))) {
			return res.status(400).send({
				status: 404,
				error: 'the user  is not found',
			});
		} if (!req.body.status || req.body.status.trim() === '') {
			return res.status(400).send({
				status: 400,
				error: 'the status property is required in order to send an RSVP',
			});
		} if (!(req.body.status === 'yes' || req.body.status === 'no' || req.body.status === 'maybe')) {
			return res.status(400).send({
				status: 400,
				error: 'invalid value of status',
			});
		}

		meetups.forEach((meetup) => {
			if (meetup.id === id) {
				flag = true;
				const rsvp = {
					id: rsvps.length + 1,
					meetup: meetup.id,
					user: parseInt(req.body.user, 10),
					status: req.body.status,
				};
				rsvps.push(rsvp);

				return res.status(201).send({
					status: 201,
					data: [{
						meetup: rsvp.meetup,
						topic: meetup.topic,
						status: rsvp.status,
					}],
				});
			}
		});

		if (!flag) {
			return res.status(404).send({
				status: 404,
				error: 'the meetup id provided is not found',
			});
		}

		return false;
	},
};
