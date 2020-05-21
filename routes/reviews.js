const express = require('express');
const router = express.Router();

//import tour controller
const reviewsController = require('../controller/reviewController');

//import authentication controller module
const authController = require('./../controller/authController');



router.get('/api/v1/reviews', reviewsController.getAllReviews);

router.get('/api/v1/review/:id', reviewsController.getSingleReview);



module.exports = router;
