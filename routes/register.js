// require modules
const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// router
const router = express.Router();

// joi schema
const registerSchema = joi.object({
	name: joi.string().required().min(2),
	email: joi.string().required().min(6).email(),
	password: joi.string().required().min(8),
	biz: joi.boolean().required(),
});

// require model
const User = require('../models/User');

// POST ->
router.post('/', async (req, res) => {
	try {
		// joi validation
		const { error } = registerSchema.validate(req.body);
		if (error) return res.status(400).send(error.message);

		// check user exist
		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('User already exist');

		// create new user
		user = new User(req.body);

		// crypt password
		const salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(user.password, salt);

		// generate token
		const token = jwt.sign({ _id: user._id, biz: user.biz }, process.env.SECRET);

		// save user
		await user.save();

		// return
		res.status(201).send({ token });
	} catch (error) {
		res.status(400).send('ERROR in register');
	}
});

// export
module.exports = router;
