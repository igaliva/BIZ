// require package
const mongoose = require('mongoose');

// schema
const cardSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
	},
	description: {
		type: String,
		required: true,
		minlength: 3,
	},
	address: {
		type: String,
		required: true,
		minlength: 3,
	},
	phone: {
		type: String,
		required: true,
		minlength: 3,
	},
	image: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	bizNumber: {
		type: Number,
		required: true,
		unique: true,
	},
});

// model
const Card = mongoose.model('cards', cardSchema);

// export
module.exports = Card;
