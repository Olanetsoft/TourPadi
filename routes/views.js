const express = require('express');
const router = express.Router();


//import authentication controller module
const authController = require('../controller/authController');

//import auth controller
const viewsController = require('../controller/viewsController');

//import booking controller
const bookingController = require('../controller/bookingController');


router.get('/',
    //this booking here is temporary until we have out site hosted
    bookingController.createBookingCheckout,
    authController.isLoggedIn,
    viewsController.getOverview);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.tourDetail);

router.get('/login', authController.isLoggedIn, viewsController.loginUser);

router.get('/me', authController.protect, viewsController.getAccountDetails);


router.post('/api/v1/users/updateMe', authController.protect, viewsController.updateUserData)

module.exports = router;