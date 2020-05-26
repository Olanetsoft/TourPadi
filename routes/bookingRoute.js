const express = require('express');
const router = express.Router();

//import booking controller
const bookingController = require('../controller/bookingController');
 
//import authentication controller module
const authController = require('./../controller/authController');


//using protect middleware
router.use(authController.protect);


//for the client to get a checkout section
router.get('/api/v1/bookings/checkout-session/:tourID', bookingController.getCheckoutSession);



//using the restriction middleware
router.use(authController.restrictTo('admin', 'lead-guide'));



router.post('/api/v1/booking', bookingController.createBooking);

router.patch('/api/v1/booking/:id', bookingController.updateBooking);

router.delete('/api/v1/booking/:id', bookingController.deleteBooking);



module.exports = router;
