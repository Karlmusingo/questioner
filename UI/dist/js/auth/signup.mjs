/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import { getById, formToJson, formToObject } from '../utils/functions.js';
import fetchApi from '../utils/fetchApi.js';

const signupForm = getById('signup_form');
const signupBtn = getById('signup_btn');

const signup = (event) => {
	event.preventDefault();
	const formObject = formToObject(signupForm);
	if (formObject.password === formObject.confirm) {
		const dataJson = formToJson(signupForm);

		fetchApi('/auth/signup', 'POST', dataJson)
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
        		getById('signup_error').style.cssText = 'display:block;color:red;';
        		getById('signup_error').innerHTML = error.error;
        	});
	} else {
		getById('signup_error').style.cssText = 'display:block;color:red;';
		getById('signup_error').innerHTML = 'The two passwords are different...';
	}
};

signupBtn.addEventListener('click', signup);
