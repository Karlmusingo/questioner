/* eslint-disable no-tabs */
/* eslint-disable indent */
import jwt from 'jsonwebtoken';
import keys from '../config/key';

function verifToken(req, res, next) {
	try {
		const authorization = req.headers.authorization;
		const token = authorization.split(' ')[1];
		const decoded = jwt.verify(token, keys.secret);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ 
            status: 401,
            error: 'Auth failed.',
        });
	}
}
export default verifToken;
