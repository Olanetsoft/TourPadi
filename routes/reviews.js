const express = require('express');
const router = express.Router();

//import tour controller
const reviewsController = require('../controller/reviewController');

//import authentication controller module
const authController = require('../controller/authController');



//To protect all the review route
//router.use(authController.protect);


router.get('/api/v1/reviews', authController.protect, reviewsController.getAllReviews);

router.get('/api/v1/review/:id', authController.protect, reviewsController.getSingleReview);


router.post('/api/v1/review', authController.protect, authController.restrictTo('user'), reviewsController.createReview);

router.patch('/api/v1/review/:id', authController.protect, authController.restrictTo('user', 'admin'), reviewsController.updateReview);

router.delete('/api/v1/review/:id', authController.protect, authController.restrictTo('user', 'admin'), reviewsController.deleteReview);


module.exports = router;
