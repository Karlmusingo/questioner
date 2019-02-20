/* eslint-disable indent */

const validateComment = (body, meetupId) => {
    const errors = [];
    if (!body.comment || body.comment.trim() === '') {
        errors.push('comment property is required for the meetup');
    } if (isNaN(meetupId)) {
        errors.push('invalid meetup id');
    }
    return errors;
};

export default validateComment;
