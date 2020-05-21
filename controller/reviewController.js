//importing tour model
const Review = require('../models/reviewModel');

//importing apiFeatures class
const APIFeatures = require('../utils/apiFeatures');

//import AppError
const AppError = require('../utils/appError');


exports.createReview = async (req, res, next) => {

};

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