/* eslint-disable no-tabs */
import pool from '../config/connection';

class Vote {
	static create(userId, questionId, status) {
		pool.query('INSERT INTO votes (user_id, question_id, status) VALUES ($1,$2,$3)', [userId, questionId, status], (err, result) => {
			if (err) {
				return false;
			}
			return result;
		});
	}

	static update(userId, questionId, status) {
		pool.query('UPDATE votes SET status = $1 WHERE user_id = $2 AND question_id = $3', [status, userId, questionId], (err, result) => {
			if (err) {
				return false;
			}
			return result;
		});
	}

	static getVote(userId, questionId) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM votes WHERE user_id = $1 AND question_id = $2 ', [userId, questionId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static getNumberVotes(questionId) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT COUNT(status) AS number, status FROM votes GROUP BY status, question_id HAVING question_id=$1', [questionId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}
}

export default Vote;
