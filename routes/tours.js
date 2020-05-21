const express = require('express');
const router = express.Router();

//import tour controller
const toursController = require('../controller/toursController');

//import review controller
const reviewController = require('../controller/reviewController');

//import authentication controller module
const authController = require('./../controller/authController');


router.get('/api/v1/tours', authController.protect, toursController.getTours);

router.get('/api/v1/tours/top-5-cheap', toursController.aliasTopTours, toursController.getTours);

router.get('/api/v1/tour-stats', toursController.getToursStats);

router.get('/api/v1/monthly-plan/:year', toursController.getMonthlyPlan);

router.post('/api/v1/tour', toursController.createTour);


//declaring the nested route with reviews
router.post('/api/v1/tours/:tourId/reviews', authController.protect, authController.restrictTo('user'), reviewController.createReview);

router.patch('/api/v1/tour/:id', toursController.updateTour);

router.delete('/api/v1/tour/:id', authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.deleteTour);

router.get('/api/v1/tours/:id', toursController.getSingleTour);


module.exports = router;
