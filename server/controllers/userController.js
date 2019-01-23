/* eslint-disable indent */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userValidation from '../middleware/userValidation';
import keys from '../config/key';
import User from '../models/modelUsers';

module.exports = {
    signup: (req, res) => {
        if (userValidation.signupValidation(req.body).length === 0) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    req.body.password = hash;
                    if (!req.body.othername) {
                        req.body.othername = '';
                    }
                    const user = await User.getUser(req.body.email);
                    if (!user) {
                        User.create(req.body);
                        return res.status(201).send({
                            status: 201,
                            data: req.body,
                        });
                    }
                    return res.status(400).send({
                        status: 400,
                        error: 'the email is used by another account',
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
    signin: async (req, res) => {
        if (userValidation.signinValidation(req.body).length === 0) {
            const user = await User.getUser(req.body.email);
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, resp) => {
                    if (resp) {
                        return res.status(200).send({
                            status: 200,
                            token: `bearer ${jwt.sign(user, keys.secret)}`,
                            data: user,
                        });
                    }
                    return res.status(400).send({
                        status: 400,
                        error: 'wrong password',
                    });
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    error: 'email not found',
                });
            }

        } else {
            return res.status(400).send({
                status: 400,
                error: userValidation.signinValidation(req.body),
            });
        }

    },
};
