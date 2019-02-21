/* eslint-disable import/extensions */
/* eslint-disable no-tabs */
import { getById, formToJson } from '../utils/functions.js';
import fetchApi from '../utils/fetchApi.js';

const loginForm = getById('login_form');
const loginBtn = getById('login_btn');

const login = (event) => {
	event.preventDefault();
	const dataJson = formToJson(loginForm);

	fetchApi('/auth/signin', 'POST', dataJson)
		.then(async (data) => {
			await localStorage.setItem('token', data.token);
			await localStorage.setItem('user', data.data[0]);
			if (data.data[0].isAdmin) {
				window.location = '/admin_page.html';
			} else {
				window.location = '/meetups.html';
			}
		})
		.catch((error) => {
			getById('login_error').style.cssText = 'display:block;color:red;align:left;';
			getById('login_error').innerHTML = error.error;
		});
};

loginBtn.addEventListener('click', login);
