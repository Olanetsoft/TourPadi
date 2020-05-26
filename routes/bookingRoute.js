const express = require('express');
const router = express.Router();

//import booking controller
const bookingController = require('../controller/bookingController');
 
//import authentication controller module
const authController = require('./../controller/authController');


//for the client to get a checkout section
router.get('/api/v1/bookings/checkout-session/:tourID', authController.protect, bookingController.getCheckoutSession);



module.exports = router;
