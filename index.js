// require packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// mongoose connection
mongoose
	.connect(process.env.dbString)
	.then(() => console.log('MongoDB connected successfully'))
	.catch((err) => console.log(err));

// app
const app = express();
const port = process.env.PORT || 5555;
app.use(express.json());

// require modules
const register = require('./routes/register');
const login = require('./routes/login');
const profile = require('./routes/profile');
const cards = require('./routes/cards');

// routes
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/profile', profile);
app.use('/api/cards', cards);

// listen
app.listen(port, () => console.log(`server is running on port ${port}`));
