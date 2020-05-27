const express = require('express');
const router = express.Router();

//import tour controller
const toursController = require('../controller/toursController');

//import review controller
const reviewController = require('../controller/reviewController');

//import authentication controller module
const authController = require('./../controller/authController');




router.get('/api/v1/tours', toursController.getTours);

router.get('/api/v1/tour/:id', toursController.getSingleTour);

router.get('/api/v1/tours/top-5-cheap', toursController.aliasTopTours, toursController.getTours);

router.get('/api/v1/tour-stats', toursController.getToursStats);

router.get('/api/v1/monthly-plan/:year', authController.protect, authController.restrictTo('admin', 'lead-guide', 'guide'), toursController.getMonthlyPlan);

router.post('/api/v1/tour', authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.createTour);

router.patch('/api/v1/tour/:id', authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.uploadTourImages, toursController.resizeTourImages, toursController.updateTour);

router.delete('/api/v1/tour/:id', authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.deleteTour);





//specify url this way which contains a lot of options
router.get('/api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit', toursController.getAllToursWithin);

//getting the users distance
router.get('/api/v1/tours/distances/:latlng/unit/:unit', toursController.getDistance);







//declaring the nested route with reviews
router.post('/api/v1/tours/:tourId/reviews', authController.protect, authController.restrictTo('user'), reviewController.createReview);

//declaring the nested route with reviews
router.get('/api/v1/tours/:tourId/reviews', authController.protect, authController.restrictTo('user'), reviewController.getAllReviews);



module.exports = router;
