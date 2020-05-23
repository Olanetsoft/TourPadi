//importing tour model
const Tour = require('../models/tourModel');

//import AppError
const AppError = require('../utils/appError');


//the overview page
exports.getOverview = async (req, res, next) => {
    try {

        //1) Get all the tour data from Collection
        const tours = await Tour.find();

        //2) Build template

        //3) Render template
        res.status(200).render('overview', {
            title: 'All Tours',
            tours
        });

    } catch (err) {
        next(new AppError('failed to get all tour', 404))
    }

};



//the tour detail page
exports.tourDetail = async (req, res, next) => {
    try {
        const singleTour = await Tour.findOne({ slug: req.params.slug }).populate({
            path: 'reviews',
            fields: 'reviews rating user'
        });

        res.status(200).render('tour', {
            title: 'Tour',
            singleTour
        });
    } catch (err) {
        next(new AppError('failed to get tour', 404))
    }

};