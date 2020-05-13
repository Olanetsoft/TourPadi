const express = require('express');
const router = express.Router();

//import tour controller
const toursController = require('../controller/tours');

router.get('/api/v1/tours/top-5-cheap', toursController.aliasTopTours, toursController.getTours);

router.get('/api/v1/tour-stats', toursController.getToursStats);

router.post('/api/v1/tour', toursController.createTour);

router.patch('/api/v1/tour/:id', toursController.updateTour);

router.delete('/api/v1/tour/:id', toursController.deleteTour);

router.get('/api/v1/tours', toursController.getTours);

router.get('/api/v1/tours/:id', toursController.getSingleTour);


module.exports = router;
