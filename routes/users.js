const express = require('express');
const router = express.Router();

//import auth controller
const authController = require('../controller/authController');

router.post('/api/v1/users/signup', authController.signup);

module.exports = router;