/* eslint-disable no-tabs */
import pool from '../config/connection';

class Question {
	static create(question, meetupId) {
		const {
			title, body, user,
		} = question;
		pool.query('INSERT INTO questions (title, body, createdBy, meetup) VALUES ($1,$2,$3,$4)', [title, body, parseInt(user, 10), meetupId], (err, result) => {
			if (err) {
				return false;
			}
			return result;
		});
	}

	static getAll(meetupId) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM questions WHERE meetup = $1 ', [meetupId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static getById(id) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM questions WHERE id = $1 ', [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static upvote(id, upvotes) {
		return new Promise((resolve, reject) => {
			pool.query('UPDATE questions SET upvotes = $1 WHERE id = $2', [upvotes, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static downvote(id, downvotes) {
		return new Promise((resolve, reject) => {
			pool.query('UPDATE questions SET downvotes = $1 WHERE id = $2 ', [downvotes, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}
}

export default Question;
