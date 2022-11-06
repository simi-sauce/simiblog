const router = require('express').Router();
const postController = require('../Controllers/postController.');
const { Protect } = require('../Controllers/auth');

// Logged in or Not Logged In users to get all published posts
router
	.route('/')
	.get(postController.Published, postController.getPosts);

// Logged in or Not Logged In users to get post by Id
router
	.route('/:id')
	.get(
		postController.unprotectedPostById,
		postController.getPostById,
	);

// Protect routes below with JWT.
router.use(Protect);

// create Post
router.route('/').post(postController.createPost);

// Delete a Post
router.route('/:id').delete(postController.deletePosts);

// update Post
router.route('/:id').patch(postController.updatePost);

// publish post
router.route('/publish/:id').post(postController.publishPosts);

// Get a Post
router
	.route('/articles/:id')
	.post(
		postController.unprotectedPostById,
		postController.protectedPostById,
		postController.getPostById,
	);

// Logged in user get only Posts created by them.
router
	.route('/articles')
	.post(postController.sortUser, postController.getPosts);

module.exports = router;
