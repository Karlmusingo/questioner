/* eslint-disable indent */

const validateMeetup = (body) => {
    const errors = [];
    if (!body.location || body.location.trim() === '') {
            errors.push('location property is required for the meetup');
    } if (!body.topic || body.topic.trim() === '') {
            errors.push('topic property is required for the meetup');
    } if (!body.happeningOn || body.happeningOn.toString().trim() === '') {
            errors.push('happeningOn property is required for the meetup');
    } if ((new Date(body.happeningOn.toString().trim())) <= (new Date())) {
            errors.push('happeningOn must come after today');
    } if (isNaN(new Date(body.happeningOn.toString().trim()))) {
            errors.push('happeningOn is not a valid Date');
    }
    return errors;
};

export default validateMeetup;
