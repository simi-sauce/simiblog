const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Error';

	const handleDevError = (err, res) => {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	};

	const handleErrorDB = (err) => {
		const message = `Invallid ${err.path} : ${err.value}. `;
		return new AppError(message, 400);
	};

	if (process.env.NODE_ENV === 'development') {
		let error = { ...err };
		// console.log(err);
		if (err.name == 'CastError ') error = handleErrorDB(err);
		handleDevError(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let Error = { ...err };
	}
};
