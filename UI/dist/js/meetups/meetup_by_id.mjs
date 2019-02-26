/* eslint-disable no-tabs */
/* eslint-disable import/extensions */
import { getById } from '../utils/functions.js';
import fetchApi from '../utils/fetchApi.js';


const getMeetup = async () => {
	const user = await JSON.parse(localStorage.getItem('user'));
	const token = await localStorage.getItem('token');
	if (user && token) {
		const url = new URL(window.location.href);
		const meetupId = url.searchParams.get('id');
		fetchApi(`/meetups/${meetupId}`, 'GET', undefined, token)
			.then(async (data) => {
				if (data.data.lenght === 0) {
					getById('meetup_wrapper').innerHTML = 'No meetup available...';
				} else {
					getById('meetup_wrapper').innerHTML = '';
					data.data.forEach((meetup) => {
						const meetupHtml = `
                        <div class="m-header">
                            <div class="m-title">
                                <h3>${meetup.topic}<i>${meetup.happeningon.split('T')[0]}</i></h3>
                            </div>
                            <div class="location">
                                <p>
                                <img src="./img/icons/pin.svg">

                                <span>${meetup.location}</span>
                                </p>
                            </div>
                        </div>
                        <div class="m-img">
                            <img src="./img/meetup_img.jpeg">
                        </div>
                        <h3 align="center">Questions</h3>
                        
                        `;
						getById('meetup_wrapper').innerHTML += meetupHtml;
						fetchApi(`/meetups/${meetup.id}/questions`, 'GET', undefined, token)
							.then((dataQuestions) => {
								dataQuestions.data.forEach((question) => {
									const questionHtml = `
                                        <div class="questionAsk">
                                            <div class="qtitle">
                                                <h4>${question.title}</h4>
                                            </div>
                                            <div class="qt">
                                                <p>
                                                    ${question.body}
                                                </p>
                                            </div>
                                            <div class="qtB">
                                                <div class="lf">
                                                    <button type="button" name="button">
                                                        <img src="./img/icons/vote.svg" alt="">
                                                    </button>
                                                    <h5>120 votes</h5>
                                                </div>
                                                <div class="lf">
                                                    <button type="button" name="button">
                                                        <img src="./img/icons/downvote.svg" alt="">
                                                    </button>
                                                    <h5>120 downvotes</h5>
                                                </div>
                                                <div class="lf">
                                                    <a href="#">
                                                        <button type="button" name="button">
                                                            <img src="./img/icons/message.svg" alt="">
                                                        </button>
                                                        <h5>120 comments</h5>
                                                    </a>
                                                </div>
                                                <div class="lf">
                                                    <a href="#" id="comment">
                                                        <button type="button" name="button">
                                                            <img src="./img/icons/message.svg" alt="">
                                                        </button>
                                                        <h5>See comments</h5>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    `;
									getById('meetup_wrapper').innerHTML += questionHtml;
								});
							});
					});
				}
			});
	} else {
		window.location = '/index.html';
	}
};
document.addEventListener('DOMContentLoaded', getMeetup);
