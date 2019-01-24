/* eslint-disable no-tabs */
const verifAdmin = (req, res, next) => {
	if (req.user.isadmin === true) {
		next();
	} else {
		return res.status(403).json({
			status: 403,
			error: 'Forbidden',
		});
	}
};
export default verifAdmin;
