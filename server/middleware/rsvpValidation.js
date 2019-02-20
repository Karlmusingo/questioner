/* eslint-disable indent */

const validateRsvp = (body, meetupId) => {
    const errors = [];
    if (!body.status || body.status.trim() === '') {
        errors.push('status property is required for the meetup');
    } if (isNaN(meetupId)) {
        errors.push('invalid meetup id');
    }
    return errors;
};

export default validateRsvp;
