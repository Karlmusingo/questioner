/* eslint-disable indent */
/* eslint-disable no-tabs */
import jwt from 'jsonwebtoken';
import Comment from '../models/Comments';
import commentValidation from '../middleware/commentValidation';
import Question from '../models/modelQuestions';
import keys from '../config/key';

const create = async (req, res) => {
    const authorization = req.headers.authorization;
	const token = authorization.split(' ')[1];
	const user = jwt.verify(token, keys.secret);
    if (commentValidation(req.body, req.params.id).length === 0) {
        const question = await Question.getById(parseInt(req.params.id, 10));
        const errors = [];
        if (question.length === 0) {
            errors.push('question not found');
        }
        if (errors.length === 0) {
            await Comment.create(req.body.comment, user.id, question[0].id);
            return res.status(201).send({
                status: 201,
                data: [{
                    question: question[0].id,
                    user: user.id,
                    title: question[0].title,
                    body: question[0].body,
                    comment: req.body.comment,
                }],
            });
        }
        return res.status(404).send({
            status: 404,
            error: errors,
        });
    }
    return res.status(400).send({
        status: 400,
        error: commentValidation(req.body, req.params.id),
    });
};

const getComments = async (req, res) => {
    if (!isNaN(req.params.id)) {
		const questionId = parseInt(req.params.id, 10);
		const comments = await Comment.getComments(questionId);
		if (comments.length !== 0) {
			return res.status(200).send({
				status: 200,
				data: comments,
			});
		}
		return res.status(404).send({
			status: 404,
			error: 'the question does not have questions',
		});
	}
	return res.status(400).send({
		status: 400,
		error: 'the meetup id is not valid',
	});
};

export default {
    create,
    getComments,
};
