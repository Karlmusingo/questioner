/* eslint-disable no-tabs */

/* eslint-disable no-tabs */
import pool from '../config/connection';

class Meetup {
	static create(meetup) {
		const {
			location, topic, happeningOn, images, tags,
		} = meetup;
		pool.query('INSERT INTO meetups (location, topic, happeningon, images, tags) VALUES ($1,$2,$3,$4,$5)', [location, topic, happeningOn, images, tags], (err, result) => {
			if (err) {
				return false;
			}
			return result;
		});
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM meetups ', (err, result) => {
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
			pool.query('SELECT * FROM meetups WHERE id = $1', [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static getUpcoming() {
		return new Promise((resolve, reject) => {
			const today = new Date();
			pool.query('SELECT * FROM meetups WHERE happeningon > $1', [today], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}

	static delete(id) {
		return new Promise((resolve, reject) => {
			pool.query('DELETE FROM meetups WHERE id = $1', [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}
}

export default Meetup;
