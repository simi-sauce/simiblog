const router = require('express').Router();
const userController = require('../Controllers/userController');
const { Register, Login } = require('../Controllers/auth');

router.route('/signup').post(Register);
router.route('/login').post(Login);

router.route('/').get(userController.getUsers);

module.exports = router;
