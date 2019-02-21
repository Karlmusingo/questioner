/* eslint-disable indent */

const validateQuestion = (body, meetupId) => {
    const errors = [];
    if (!body.title || body.title.trim() === '') {
        errors.push('title property is required for the meetup');
    } if (!body.body || body.body.trim() === '') {
        errors.push('body property is required for the meetup');
    } if (isNaN(meetupId)) {
        errors.push('invalid meetup id');
    }
    return errors;
};

export default validateQuestion;
