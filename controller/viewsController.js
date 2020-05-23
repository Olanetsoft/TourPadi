//importing tour model
const Tour = require('../models/tourModel');

//import AppError
const AppError = require('../utils/appError');


//the homepage
exports.homePage = (req, res, next) => {
    res.status(200).render('base', {
        tour: 'The forest',
        user: 'Idris'
    })
};


//the overview page
exports.getOverview = (req, res, next) => {
    res.status(200).render('overview', {
        title: 'All Tours'
    })
};


//the tour detail page
exports.tourDetail = (req, res, next) => {
    res.status(200).render('tour', {
        title: 'Tour'
    });
};