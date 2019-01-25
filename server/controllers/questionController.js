/* eslint-disable no-tabs */
import jwt from 'jsonwebtoken';
import questionValidation from '../middleware/questionValidation';
import Question from '../models/modelQuestions';
import Meetup from '../models/modelMeetups';
import Vote from '../models/Votes';
import keys from '../config/key';

const create = async (req, res) => {
	const authorization = req.headers.authorization;
	const token = authorization.split(' ')[1];
	const user = jwt.verify(token, keys.secret);
	if (questionValidation(req.body, req.params.id).length === 0) {
		const errors = [];
		const meetupId = parseInt(req.params.id, 10);
		const meetup = await Meetup.getById(meetupId);
		if (meetup.length === 0) {
			errors.push('meetup not found');
		}
		if (errors.length === 0) {
			Question.create(req.body, user.id, meetupId);
			return res.status(201).send({
				status: 201,
				data: [{
					user: user.id,
					meetup: meetupId,
					title: req.body.title,
					body: req.body.body,
				}],
			});
		}
		return res.status(404).send({
			status: 404,
			error: errors,
		});
	} else {
		return res.status(400).send({
			status: 400,
			error: questionValidation(req.body, req.params.id),
		});
	}
};

const upvote = async (req, res) => {
	const authorization = req.headers.authorization;
	const token = authorization.split(' ')[1];
	const user = jwt.verify(token, keys.secret);
	if (!isNaN(req.params.id)) {
		const id = parseInt(req.params.id, 10);
		const question = await Question.getById(id);
		if (question.length !== 0) {
			const vote = await Vote.getVote(user.id, id);
			if (vote.length === 0) {
				await Vote.create(user.id, id, 'upvote');
				const numberVotes = await Vote.getNumberVotes(question[0].id);
				return res.status(200).send({
					status: 200,
					data: [{
						meetup: question[0].meetup,
						title: question[0].title,
						body: question[0].body,
						upvotes: (numberVotes[1]) ? numberVotes[1].number : 0,
						downvotes: (numberVotes[0]) ? numberVotes[0].number : 0,
					}],
				});
			}
			if (vote[0].status !== 'upvote') {
				await Vote.update(vote[0].user_id, vote[0].question_id, 'upvote');
				const numberVotes = await Vote.getNumberVotes(vote[0].question_id);
				return res.status(200).send({
					status: 200,
					data: [{
						meetup: question[0].meetup,
						title: question[0].title,
						body: question[0].body,
						upvotes: (numberVotes[1]) ? numberVotes[1].number : 0,
						downvotes: (numberVotes[0]) ? numberVotes[0].number : 0,
					}],
				});
			}
			return res.status(401).send({
				status: 401,
				error: 'the user cannot upvote the question more than once!',
			});
		}
	}
	return res.status(400).send({
		status: 400,
		error: 'the question id is not valid',
	});
};

const downvote = async (req, res) => {
	const authorization = req.headers.authorization;
	const token = authorization.split(' ')[1];
	const user = jwt.verify(token, keys.secret);
	if (!isNaN(req.params.id)) {
		const id = parseInt(req.params.id, 10);
		const question = await Question.getById(id);
		if (question.length !== 0) {
			const vote = await Vote.getVote(user.id, id);
			if (vote.length === 0) {
				await Vote.create(user.id, id, 'downvote');
				const numberVotes = await Vote.getNumberVotes(question[0].id);
				return res.status(200).send({
					status: 200,
					data: [{
						meetup: question[0].meetup,
						title: question[0].title,
						body: question[0].body,
						upvotes: (numberVotes[1]) ? numberVotes[1].number : 0,
						downvotes: (numberVotes[0]) ? numberVotes[0].number : 0,
					}],
				});
			}
			if (vote[0].status !== 'downvote') {
				await Vote.update(vote[0].user_id, vote[0].question_id, 'downvote');
				const numberVotes = await Vote.getNumberVotes(vote[0].question_id);
				return res.status(200).send({
					status: 200,
					data: [{
						meetup: question[0].meetup,
						title: question[0].title,
						body: question[0].body,
						upvotes: (numberVotes[1]) ? numberVotes[1].number : 0,
						downvotes: (numberVotes[0]) ? numberVotes[0].number : 0,
					}],
				});
			}
			return res.status(401).send({
				status: 401,
				error: 'the user cannot downvote the question more than once!',
			});
		}
	}
	return res.status(400).send({
		status: 400,
		error: 'the question id is not valid',
	});
};

const getQuestionsForASpecificMeetup = async (req, res) => {
	if (!isNaN(req.params.id)) {
		const meetupId = parseInt(req.params.id, 10);
		const questions = await Question.getAll(meetupId);
		if (questions.length !== 0) {
			return res.status(200).send({
				status: 200,
				data: questions,
			});
		}
		return res.status(404).send({
			status: 404,
			error: 'the meetup does not have questions',
		});
	}
	return res.status(400).send({
		status: 400,
		error: 'the meetup id is not valid',
	});
};

export default {
	create,
	upvote,
	downvote,
	getQuestionsForASpecificMeetup,
};
