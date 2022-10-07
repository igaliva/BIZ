// require modules
const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// router
const router = express.Router();

// joi schema
const loginSchema = joi.object({
	email: joi.string().required().min(6).email(),
	password: joi.string().required().min(8),
});

// require model
const User = require('../models/User');

// POST ->
router.post('/', async (req, res) => {
	try {
		// joi validation
		const { error } = loginSchema.validate(req.body);
		if (error) return res.status(400).send(error.message);

		// check user exist
		let user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(404).send('User doesnt exist');

		// compare password using bcrypt
		const comparePass = await bcrypt.compare(req.body.password, user.password);

		// generate token
		const token = jwt.sign({ _id: user._id, biz: user.biz }, process.env.SECRET);

		// return
		res.status(200).send({ token });
	} catch (error) {
		res.status(400).send('ERROR in login');
	}
});

// export
module.exports = router;
