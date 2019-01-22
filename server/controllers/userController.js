/* eslint-disable indent */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/modelUsers';
import userValidation from '../middleware/userValidation';
import keys from '../config/key';

module.exports = {
    signup: (req, res) => {
        if (userValidation.signupValidation(req.body).length === 0) {
            const newUser = {
                id: users.length,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                othername: (req.body.othername) ? req.body.othername : '',
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                username: req.body.username,
                password: req.body.password,
                registered: new Date(),
                isAdmin: false,
            };
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    users.push(newUser);
                    return res.status(201).send({
                        status: 201,
                        data: newUser,
                    });
                });
            });
        } else {
            return res.status(400).send({
                status: 400,
                error: userValidation.signupValidation(req.body),
            });
        }
    },
    signin: (req, res) => {
        if (userValidation.signinValidation(req.body).length === 0) {
            users.forEach((__user) => {
                if (__user.email === req.body.email) {
                    if (__user.password === req.body.password) {
                        const user = {
                            id: 1,
                            firstname: __user.firstname,
                            lastname: __user.lastname,
                            othername: __user.othername,
                            email: __user.email,
                            phoneNumber: __user.phoneNumber,
                            username: __user.username,
                            registered: __user.registered,
                            isAdmin: __user.isAdmin,
                        };
                        return res.status(200).send({
                            status: 200,
                            token: `bearer ${jwt.sign(user, keys.secret)}`,
                            user: __user,
                        });
                    }
                    return res.status(404).send({
                        status: 404,
                        error: 'wrong password',
                    });
                }
            });
            return res.status(404).send({
                status: 404,
                error: 'email not found',
            });
        }
        return res.status(400).send({
            status: 400,
            error: userValidation.signinValidation(req.body),
        });
    },
};
