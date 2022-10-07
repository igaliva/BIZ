// require modules
const express = require('express');
const joi = require('joi');
const _ = require('lodash');

// router
const router = express.Router();

// joi schema
const cardSchemaJoi = joi.object({
	name: joi.string().required().min(3),
	description: joi.string().required().min(3),
	address: joi.string().required().min(3),
	phone: joi.string().required().min(3),
	image: joi.string().required().min(3),
});

// require model
const Card = require('../models/Card');

// require middleware
const auth = require('../middleware/auth');

// POST ->
router.post('/', auth, async (req, res) => {
	try {
		// joi validation
		const { error } = cardSchemaJoi.validate(req.body);
		if (error) return res.status(400).send(error.message);

		// create new card
		let card = new Card(req.body);

		// loop to find available bizNumber
		let flag = true;

		while (flag) {
			let random = _.random(1, 5);
			let checkCard = await Card.findOne({ bizNumber: random });
			if (!checkCard) flag = false;
			card.bizNumber = random;
			card.userId = req.payload._id;
		}

		// save card
		await card.save();

		// return
		res.status(201).send(card);
	} catch (error) {
		res.status(400).send('ERROR in add new card');
	}
});

// GET -> all cards
router.get('/', auth, async (req, res) => {
	try {
		// check for cards
		let cards = await Card.find();
		if (cards == null) return res.status(404).send('No cards found');

		// return
		res.status(200).send(cards);
	} catch (error) {
		res.status(400).send('ERROR in get all cards');
	}
});

// GET -> all user cards
router.get('/my-cards', auth, async (req, res) => {
	try {
		// check for cards
		let cards = await Card.find({ userId: req.payload._id });
		if (cards == null) return res.status(404).send('No cards found');

		// return
		res.status(200).send(cards);
	} catch (error) {
		res.status(400).send('ERROR in get all user cards');
	}
});

// GET -> single card
router.get('/:id', auth, async (req, res) => {
	try {
		// check for cards
		let card = await Card.findById(req.params.id);
		if (!card) return res.status(404).send('No such card');

		// return
		res.status(200).send(card);
	} catch (error) {
		res.status(400).send('ERROR in get single card');
	}
});

// PUT -> update card
router.put('/:id', auth, async (req, res) => {
	try {
		// check for cards
		let card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!card) return res.status(404).send('No such card');

		// return
		res.status(200).send(card);
	} catch (error) {
		res.status(400).send('ERROR in update card');
	}
});

// DELETE -> delete card
router.delete('/:id', auth, async (req, res) => {
	try {
		// check for cards
		let card = await Card.findByIdAndRemove(req.params.id);
		if (!card) return res.status(404).send('No such card');

		// return
		res.status(200).send('Card deleted successfully');
	} catch (error) {
		res.status(400).send('ERROR in deleting card');
	}
});

// export
module.exports = router;
