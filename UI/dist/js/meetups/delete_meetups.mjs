/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import { getById } from '../utils/functions.js';
import fetchApi from '../utils/fetchApi.js';

const deleteLink = getById('delete_link');

const getAllMeetups = async () => {
	const user = await JSON.parse(localStorage.getItem('user'));
	const token = await localStorage.getItem('token');
	if (user && token) {
		fetchApi('/meetups', 'GET', undefined, token)
			.then(async (data) => {
				if (data.data.lenght === 0) {
					getById('meetups').innerHTML = 'No meetup available...';
				} else {
					getById('meetups').innerHTML = '';
					data.data.forEach((meetup) => {
						const meetupHtml = `
                        <div id="meetup_${meetup.id}">
                            <div id="meetup_child_${meetup.id}" >
                                <table class="well">
                                    <tr>
                                        <td>
                                            <strong>${meetup.topic}</strong><i>${meetup.happeningon.split('T')[0]}</i>
                                            <div>
                                                <p>${meetup.location}</p>

                                            </div>
                                        </td>
                                        <td>
                                            <button id="${meetup.id}" class="btn-small delete">Delete</button>
                                        </td>
                                    </tr>
                                </table>
                                <div> <br> </div>
                            </div>
                        </div>
                        `;
						getById('meetups').innerHTML += meetupHtml;
					});
				}
			});
	} else {
		window.location = '/index.html';
	}
};

// const deleteBtn = document.getElementsByClassName('btn-small delete');

const deleteMeetup = async (event) => {
	event.preventDefault();

	const user = await JSON.parse(localStorage.getItem('user'));
	const token = await localStorage.getItem('token');

	const meetupToBeDeleted = getById(`meetup_${event.target.id}`);
	const meetupChildToBeDeleted = getById(`meetup_child_${event.target.id}`);

	if (user && token) {
		if (!event.target.matches('.btn-small')) return;
		getById(event.target.id).innerText = 'Deleting...';
		fetchApi(`/meetups/${event.target.id}`, 'DELETE', undefined, token)
			.then(async (data) => {
				meetupToBeDeleted.removeChild(meetupChildToBeDeleted);
				// getById('delete_message').style.cssText = 'display:block;color:green;';
				// getById('delete_message').innerHTML = data.data[0];
			})
			.catch((error) => {
				getById(event.target.id).innerText = 'Delete';
				getById('delete_message').style.cssText = 'display:block;color:red;';
				getById('delete_message').innerHTML = error.error;
			});
	} else {
		window.location = '/index.html';
	}
};

deleteLink.addEventListener('click', getAllMeetups);
document.addEventListener('click', deleteMeetup);
