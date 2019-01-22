/* eslint-disable indent */

function validateMeetup(body) {
    const errors = [];
    if (!body.firstname || body.firstname.trim() === '') {
        errors.push('firstname is required');
    } if (!body.lastname || body.lastname.trim() === '') {
       errors.push('lastname is required');
    } if (body.othername && body.othername.trim() === '') {
       errors.push('othername is not vadide');
    } if (!body.email || body.email.trim() === '') {
        errors.push('email is required');
    } if (!body.phoneNumber || body.phoneNumber.trim() === '') {
       errors.push('phoneNumber is required');
    } if (!body.username || body.username.trim() === '') {
       errors.push('username is required');
    } if (!body.password || body.password.trim() === '') {
        errors.push('password is required');
    }
    return errors;
}

module.exports = {
    validateMeetup,
};
