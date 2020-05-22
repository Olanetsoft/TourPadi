//importing tour model
const Review = require('../models/reviewModel');

//importing apiFeatures class
const APIFeatures = require('../utils/apiFeatures');

//import AppError
const AppError = require('../utils/appError');

//import handlerFactory
const factory = require('./handlerFactory');


//create a new review
exports.createReview = async (req, res, next) => {
    try {

        //Allow nested route
        //Also set the tour an user from the params if its not passed to the body
        if (!req.body.tour) req.body.tour = req.params.tourId;
        if (!req.body.user) req.body.user = req.user.id;

        const newReview = await Review.create(req.body);

        res.status(201).json({
            status: 'success 🙌',
            data: {
                newReview
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'failed 🤷‍♀️',
            message: err
        })
    };
};


//Get all reviews
exports.getAllReviews = async (req, res, next) => {
    try {
        let filter = {};
        //this is added to che if the params include tourId then is should return reviews with respect to the tourId else return all reviews
        if(req.params.tourId) filter = {tour: req.params.tourId}

        const allReviews = await Review.find(filter);

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success 🙌',
            result: allReviews.length,
            data: {
                allReviews
            }
        });

    } catch (err) {
        next(new AppError('Trying to get all reviews failed', 404))

    }
};


//get single review
exports.getSingleReview = async (req, res, next) => {
    try {
        const singleReview = await Review.findById(req.params.id);

        //Or Review.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                singleReview
            }
        });
    } catch (err) {
        //return error to check if tour exist
        next(new AppError(`No Review found with ID: ${req.params.id}`, 404));
    }
};

//delete review
exports.deleteReview = factory.deleteOneDocument(Review);

//update review
exports.updateReview = factory.updateOneDocument(Review);