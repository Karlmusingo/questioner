/* eslint-disable no-tabs */
import jwt from 'jsonwebtoken';
import rsvpValidation from '../middleware/rsvpValidation';
import Meetup from '../models/modelMeetups';
import Rsvp from '../models/modelRsvps';
import keys from '../config/key';

const create = async (req, res) => {
	const authorization = req.headers.authorization;
	const token = authorization.split(' ')[1];
	const user = jwt.verify(token, keys.secret);
	if (rsvpValidation(req.body, req.params.id).length === 0) {
		const id = parseInt(req.params.id, 10);
		const errors = [];
		const meetup = await Meetup.getById(id);
		if (meetup.length === 0) {
			errors.push('meetup not found');
		}
		if (errors.length === 0) {
			const rsvp = await Rsvp.getRsvp(meetup[0].id, user.id);
			if (rsvp.length === 0) {
				await Rsvp.create(req.body, id);
				return res.status(201).send({
					status: 201,
					data: [{
						meetup: id,
						user: user.id,
						topic: meetup[0].topic,
						status: req.body.status,
					}],
				});
			}
			return res.status(401).send({
				status: 401,
				error: 'the user cannot rsvp on meetup more than once',
			});
		}
		return res.status(404).send({
			status: 404,
			error: errors,
		});
	}
	return res.status(400).send({
		status: 400,
		error: rsvpValidation(req.body, req.params.id),
	});
};

export default { create };
