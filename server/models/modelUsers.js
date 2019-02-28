/* eslint-disable no-tabs */
import pool from '../config/connection';

class User {
	static create(user) {
		const {
			firstname, lastname, othername, email, phoneNumber, username, password, isAdmin,
		} = user;
		return new Promise((resolve,reject)=>{
	  pool.query('INSERT INTO users (firstname, lastname, othername, email, phonenumber, username, password, isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *', [firstname, lastname, othername, email, phoneNumber, username, password, isAdmin], (err, result) => {
				if (err) {
					//console.log(err);
					reject(err);
				}
				//return result.rows;
				resolve(result.rows[0]);
			});
		})
		
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

	static getUserById(id) {
		return new Promise((resolve, reject) => {
			pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
				if (err) {
					// return false;
					reject(err);
				} else {
					resolve(result.rows);
				}
			});
		});
	}
}

export default User;
