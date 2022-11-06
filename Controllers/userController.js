const userModel = require('../Models/userModel');
const catchAsync = require('../utils/CatchAsync');
const AppRes = require('../utils/AppResponse');
const AppError = require('../utils/AppError');

// uiniversal User variable
var User;

exports.getUsers = catchAsync(async (req, res, next) => {
	User = await userModel.find();

	new AppRes(res, User, 200);
});

// delete a User
exports.deleteUser = catchAsync(async (req, res, next) => {
	User = await userModel.findByIdAndDelete(req.params.id);

	if (!User) return next(new AppError('User not Found', 404));

	new AppRes(res, User, 200);
});

// update user
exports.updateUser = catchAsync(async (req, res) => {
	User = await userModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	new AppRes(res, User, 200);
});
