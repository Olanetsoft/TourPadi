const express = require('express');
const router = express.Router();

//import tour controller
const reviewsController = require('../controller/reviewController');

//import authentication controller module
const authController = require('./../controller/authController');



router.post('/api/v1/review', authController.protect, authController.restrictTo('user'), reviewsController.createReview);

router.patch('/api/v1/review/:id', reviewsController.updateReview);

router.get('/api/v1/reviews', reviewsController.getAllReviews);

router.get('/api/v1/review/:id', reviewsController.getSingleReview);

router.delete('/api/v1/review/:id', reviewsController.deleteReview);



module.exports = router;
