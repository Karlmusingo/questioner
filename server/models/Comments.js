/* eslint-disable no-tabs */
import pool from '../config/connection';

class Comment {
	static create(comment, userId, questionId) {
		pool.query('INSERT INTO comments (question, user_id, comment) VALUES ($1,$2,$3)', [questionId, userId, comment], (err, result) => {
			if (err) {
				return false;
			}
			return result;
		});
	}

	static getComments(questionId) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM comments WHERE question = $1', [questionId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}
}

export default Comment;
