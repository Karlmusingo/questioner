/* eslint-disable no-tabs */
import pool from '../config/connection';

class Rsvp {
	static create(rsvp, meetupId) {
		const { status, user } = rsvp;
		pool.query('INSERT INTO rsvps (meetup, user_id, status) VALUES ($1,$2,$3)', [meetupId, parseInt(user, 10), status], (err, result) => {
			if (err) {
				return false;
			}
			return result;
		});
	}

	static countRsvps(meetupId) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT COUNT(meetup) AS number, status FROM rsvps GROUP BY status HAVING meetup = $1', [meetupId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static getRsvp(meetupId, userId) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM rsvps WHERE meetup = $1 AND user_id = $2 ', [meetupId, userId], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}
}

export default Rsvp;
