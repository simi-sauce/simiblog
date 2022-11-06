const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const errController = require('./Controllers/ErrorController');
const USERROUTER = require('./routes/userRoute');
const POSTROUTER = require('./routes/postRoute');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());
app.use(morgan('common'));

app.use('/api/v1/users', USERROUTER);
app.use('/api/v1/posts', POSTROUTER);

app.get('/api/v1/', (req, res) => {
	res.send('Welcome to Cracked Ink');
});

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this server!!`,
			404,
		),
	);
});

app.use(errController);

module.exports = app;
