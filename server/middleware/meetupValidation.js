/* eslint-disable indent */

function validateMeetup(body) {
    const errors = [];
    if (!body.location || body.location.trim() === '') {
            errors.push('location property is required for the meetup');
    } if (!body.topic || body.topic.trim() === '') {
            errors.push('topic property is required for the meetup');
    } if (!body.happeningOn || body.happeningOn.trim() === '') {
            errors.push('happeningOn property is required for the meetup');
    } if ((new Date(body.happeningOn.trim())) <= (new Date())) {
            errors.push('happeningOn must come after today');
    } if (isNaN(new Date(body.happeningOn.trim()))) {
            errors.push('happeningOn is not a valide Date');
    }
    return errors;
}

module.exports = validateMeetup;
