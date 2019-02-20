/* eslint-disable indent */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userValidation from '../middleware/userValidation';
import keys from '../config/key';
import User from '../models/modelUsers';

const signup = async (req, res) => {
    if (userValidation.signupValidation(req.body).length === 0) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                req.body.password = hash;
                if (!req.body.othername) {
                    req.body.othername = '';
                }
                const user = await User.getUser(req.body.email);
                if (!user) {
                    await User.create(req.body);
                    const userSignedUp = await User.getUser(req.body.email);
                    const userLoggedIn = {
                        id: userSignedUp.id,
                        username: userSignedUp.username,
                        email: userSignedUp.email,
                        isAdmin: userSignedUp.isadmin,
                    };
                    return res.status(201).send({
                        status: 201,
                        token: `bearer ${jwt.sign(userLoggedIn, keys.secret)}`,
                        data: [{
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            othername: req.body.othername,
                            email: req.body.email,
                            phoneNumber: req.body.phoneNumber,
                            username: req.body.username,
                        }],
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
};

const signin = async (req, res) => {
    if (userValidation.signinValidation(req.body).length === 0) {
        const user = await User.getUser(req.body.email);
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, resp) => {
                if (resp) {
                    const userLoggedIn = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isadmin,
                    };
                    return res.status(200).send({
                        status: 200,
                        token: `bearer ${jwt.sign(userLoggedIn, keys.secret)}`,
                        data: [userLoggedIn],
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
};

export default {
    signup,
    signin,
};
