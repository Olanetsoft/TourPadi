const express = require('express');
const router = express.Router();


//import authentication controller module
const authController = require('../controller/authController');

//import auth controller
const viewsController = require('../controller/viewsController');


router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/tour/:slug',authController.isLoggedIn, viewsController.tourDetail);

router.get('/login',authController.isLoggedIn, viewsController.loginUser);

router.get('/me', authController.protect, viewsController.getAccountDetails);


module.exports = router;