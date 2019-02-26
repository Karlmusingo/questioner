/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import { getById, formToJson } from '../utils/functions.js';
import fetchApi from '../utils/fetchApi.js';

const createMeetupForm = getById('create_meetup_form');
const createMeetupBtn = getById('create_meetup_btn');

const createMeetup = async (event) => {
	event.preventDefault();
	const dataJson = formToJson(createMeetupForm);

	const user = await JSON.parse(localStorage.getItem('user'));
	const token = await localStorage.getItem('token');
	if (user && token) {
		fetchApi('/meetups', 'POST', dataJson, token)
			.then(async (data) => {
				getById('create_meetup_error').style.cssText = 'display:block;color:green;';
				getById('create_meetup_error').innerHTML = 'Meetup saved successfully...';
				createMeetupForm.reset();
			})
			.catch((error) => {
				getById('create_meetup_error').style.cssText = 'display:block;color:red;';
				getById('create_meetup_error').innerHTML = error.error;
			});
	} else {
		window.location = '/index.html';
	}
};

createMeetupBtn.addEventListener('click', createMeetup);
