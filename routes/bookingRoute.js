const express = require('express');
const router = express.Router();

//import booking controller
const bookingController = require('../controller/bookingController');

//import authentication controller module
const authController = require('../controller/authController');


//using protect middleware
//router.use(authController.protect);


//for the client to get a checkout section
router.get('/api/v1/bookings/checkout-session/:tourID', authController.protect, bookingController.getCheckoutSession);



//using the restriction middleware
//router.use(authController.restrictTo('admin', 'lead-guide'));



router.post('/api/v1/booking', authController.protect, authController.restrictTo('admin', 'lead-guide'), bookingController.createBooking);

router.patch('/api/v1/booking/:id', authController.protect, authController.restrictTo('admin', 'lead-guide'), bookingController.updateBooking);

router.delete('/api/v1/booking/:id', authController.protect, authController.restrictTo('admin', 'lead-guide'), bookingController.deleteBooking);



module.exports = router;
