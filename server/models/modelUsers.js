/* eslint-disable no-tabs */
import pool from '../config/connection';

class User {
	static create(user) {
		const {
			firstname, lastname, othername, email, phoneNumber, username, password, isadmin,
		} = user;
		pool.query('INSERT INTO users (firstname, lastname, othername, email, phonenumber, username, password, isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [firstname, lastname, othername, email, phoneNumber, username, password, false], (err, result) => {
			if (err) {
				return false;
			}
			return user;
		});
	}

	static getUser(email) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
				if (err) {
					// return false;
					reject(err);
				} else {
					resolve(result.rows[0]);
				}
			});
		});
	}
}


export default User;
