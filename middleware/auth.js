// require package
const jwt = require('jsonwebtoken');

// export
module.exports = (req, res, next) => {
	try {
		// check token exist
		const token = req.header('Authorization');
		if (!token) return res.status(404).send('No token provided');

		// verify token
		const payload = jwt.verify(token, process.env.SECRET);
		if (!payload) return res.status(401).send('Unauthorized');
		req.payload = payload;
		next();
	} catch (error) {
		res.status(400).send('ERROR in auth');
	}
};
