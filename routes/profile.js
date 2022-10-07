// require packages
const express = require('express');
const _ = require('lodash');

// router
const router = express.Router();

// require middleware
const auth = require('../middleware/auth');

// require model
const User = require('../models/User');

// GET ->
router.get('/', auth, async (req, res) => {
	try {
		// check if user exist
		let user = await User.findById(req.body._id);
		if (!user) return res.status(404).send('User doesnt exist');

		// return
		res.status(200).send(_.pick(user, ['name', 'email', 'biz', '_id']));
	} catch (error) {
		res.status(400).send('ERROR in profile');
	}
});

// export
module.exports = router;
