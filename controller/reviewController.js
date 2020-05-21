//importing tour model
const Review = require('../models/reviewModel');

//importing apiFeatures class
const APIFeatures = require('../utils/apiFeatures');

//import AppError
const AppError = require('../utils/appError');


//create a new review
exports.createReview = async (req, res, next) => {
    try {
        //You can use this nothing is wrong with it
        // const newReview = new Review({});
        // newReview.save();

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

        const allReviews = await Review.find();

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