// require package
const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
	},
	email: {
		type: String,
		required: true,
		minlength: 6,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	biz: {
		type: Boolean,
		required: true,
	},
});

// model
const User = mongoose.model('users', userSchema);

// export
module.exports = User;
