const userModel = require('../Models/userModel');
const AppError = require('../utils/AppError');
const AppRes = require('../utils/AppResponse');
const catchAsync = require('../utils/CatchAsync');
const jwt = require('jsonwebtoken');
const util = require('util');

// universal User variable
var User;

// Sign Token Fn.
const SIGNTOKEN = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

//  Register
exports.Register = catchAsync(async (req, res, next) => {
	const {
		firstName,
		lastName,
		password,
		email,
		password_confirm,
		username,
	} = req.body;

	console.log(req.body);

	// if (!firstName || !lastName || !email || !password) {
	// 	return next(new AppError('Missing Parameters '));
	// }

	User = await userModel.create({
		firstName: firstName,
		lastName: lastName,
		password: password,
		password_confirm: password_confirm,
		username: username,
		email: email,
	});

	const TOKEN = SIGNTOKEN(User._id);
	new AppRes(res, User, 201, TOKEN);
});

// Login
exports.Login = catchAsync(async (req, res, next) => {
	const { password, email } = req.body;

	if (!email || !password) {
		return new AppError('Please Provide email and Password', 400);
	}

	User = await userModel.findOne({ email }).select('+ password');

	if (!User || !(await User.checkPassword(password, User.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	const TOKEN = SIGNTOKEN(User._id);
	new AppRes(res, User, 200, TOKEN);
});

// Auth Users
exports.Protect = catchAsync(async (req, res, next) => {
	// Get Token and check is exist
	req.requeestTime = new Date().toISOString();
	// console.log(req.headers);

	let TOKEN;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		TOKEN = req.headers.authorization.split(' ')[1];
	}

	if (!TOKEN) {
		return next(new AppError('Login to get accees', 401));
	}

	// decode token is REAL
	// Verify Token
	const decodeToken = await util.promisify(jwt.verify)(
		TOKEN,
		process.env.JWT_SECRET,
	);

	// Check If user still exists while Token is active
	const curUser = await userModel.findById(decodeToken.id);
	if (!curUser)
		return next(
			new AppError('User with Token no longer exists', 401),
		);

	// console.log(curUser);

	req.curUser = curUser;
	next();
});
