const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		default: 'draft',
		enum: ['draft', 'published'],
	},
	readCount: {
		type: Number,
		default: 0,
	},
	readingTime: {
		type: Number,
		default: 0,
	},
	tags: [String],
	__v: {
		type: Number,
		select: false,
	},
	created_at: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
