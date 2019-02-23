/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import { getById } from '../utils/functions.js';
import fetchApi from '../utils/fetchApi.js';

const getUpcomingMeetups = async () => {
	const user = await JSON.parse(localStorage.getItem('user'));
	const token = await localStorage.getItem('token');
	if (user && token) {
		fetchApi('/meetups/upcoming', 'GET', undefined, token)
			.then(async (data) => {
				if (data.data.lenght === 0) {
					getById('wrapper_meetups').innerHTML = 'No meetup available...';
				} else {
					getById('grid_meetups').innerHTML = '';
					data.data.forEach((meetup) => {
						const meetupHtml = `
                        <div id="meetup_container">
                            <div class="m-title">
                                <p>${meetup.topic}</p>
                            </div>
                            <div class="m-img">
                                <a id="${meetup.id}" href="questions.html?id=${meetup.id}">
                                    <img id="meetup_image" src="./img/meetup_img.jpeg">
                                </a>
                            </div>
                            <div class="m-footer">
                                <img src="./img/icons/pin.svg">
                                <span> ${meetup.location} </span><i>${meetup.happeningon.split('T')[0]}</i>
                            </div>
                        </div>
                        `;
						getById('grid_meetups').innerHTML += meetupHtml;
					});
				}
			});
	} else {
		window.location = '/index.html';
	}
};

document.addEventListener('DOMContentLoaded', getUpcomingMeetups);
