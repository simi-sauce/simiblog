const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'User must have an Email address'],
			unique: true,
		},
		firstName: {
			type: String,
			required: [true, 'User must have First name'],
		},
		lastName: {
			type: String,
			required: [true, 'User must have Last Name '],
		},
		email: {
			type: String,
			required: [true, 'User must have an Email address'],
			unique: true,
			validate: [validator.isEmail, 'Enter a valid Email address'],
		},
		password: {
			type: String,
			required: [true, 'Please provide your Password'],
			select: false,
		},
		password_confirm: {
			type: String,
			required: [true, 'Please provide your Confirm Password'],
			validate: {
				validator: function (el) {
					return el === this.password;
				},
				message: 'Passwords do not match',
			},
		},
		__v: {
			type: Number,
			select: false,
		},
		profilePicture: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true },
);

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.password_confirm = await bcrypt.hash(
		this.password_confirm,
		12,
	);
	next();
});

UserSchema.methods.checkPassword = async (
	THISPASSWORD,
	userPassword,
) => {
	return await bcrypt.compare(THISPASSWORD, userPassword);
};

module.exports = mongoose.model('User', UserSchema);
