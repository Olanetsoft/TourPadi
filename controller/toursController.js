const fs = require('fs');
//importing tour model
const Tour = require('../models/tourModel');

//importing apiFeatures class
const APIFeatures = require('../utils/apiFeatures');

//import AppError
const AppError = require('../utils/appError');

//import handlerFactory
const factory = require('./handlerFactory');




//middleware to query top 5 cheap tours
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficultly';
    next();
};

//create tour model
exports.createTour = async (req, res, next) => {
    try {
        //You can use this nothing is wrong with it
        // const newTour = new Tour({});
        // newTour.save();

        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success 🙌',
            result: newTour.length,
            data: {
                newTour
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
        //console.log("FIle not created: " + err);
    };

};


//Gets all the tours
exports.getTours = async (req, res, next) => {
    try {

        //EXECUTE THE QUERY_OBJ
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const allTours = await features.query;

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success 🙌',
            result: allTours.length,
            data: {
                allTours
            }
        });
    } catch (err) {

        next();
        // res.status(404).json({
        //     status: "failed",
        //     message: err
        // });
    }
}


//gets a single tour
exports.getSingleTour = async (req, res, next) => {
    try {

        const singleTour = await Tour.findById(req.params.id).populate('reviews');

        //Or Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                singleTour
            }
        });
    } catch (err) {

        //return error to check if tour exist
        next(new AppError(`No tour found with ID: ${req.params.id}`, 404));
        // res.status(404).json({
        //     status: "failed",
        //     message: err
        // });
    }

};

//update a single tour
exports.updateTour = factory.updateOneDocument(Tour);
// exports.updateTour = async (req, res, next) => {
//     try {
//         const singleTourUpdate = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 singleTourUpdate
//             }
//         });
//     } catch (err) {
//         //return error to check if tour is updated
//         next(new AppError('Unable to Update Tour', 404));
//         // res.status(404).json({
//         //     status: "failed",
//         //     message: err
//         // });
//     };

// };



//delete a single tour
exports.deleteTour = factory.deleteOneDocument(Tour);

// exports.deleteTour = async (req, res, next) => {
//     try {
//         await Tour.findByIdAndDelete(req.params.id);
//         res.status(204).json({
//             status: 'success',
//             data: null
//         });
//     } catch (err) {
//         //return error to check if tour was deleted
//         next(new AppError(`Unable to delete Tour with ID: ${req.params.id}`, 404));
//         // res.status(404).json({
//         //     status: "failed to delete",
//         //     message: err
//         // });
//     };

// };




//using aggregation pipeline
exports.getToursStats = async (req, res, next) => {
    try {
        const stats = await Tour.aggregate([
            {
                //filtering a certain countDocuments
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numOfTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                //1 added is for ascending
                $sort: { avgPrice: 1 }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });

    } catch (err) {
        //return error to check if tour stats exist
        next(new AppError('Unable to get all Stats', 404));

        // res.status(404).json({
        //     status: "failed to get Stats",
        //     message: err
        // });
    };
};

//get monthly plan analysis
exports.getMonthlyPlan = async (req, res, next) => {
    try {
        const year = req.params.year * 1; //2021

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                //group by startDates
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    //to store the details in array
                    tours: { $push: '$name' }
                }
            },
            {
                //adding new fields
                $addFields: { month: '$_id' }
            },
            {
                //to make _id no longer show up
                $project: {
                    _id: 0
                }
            },
            {
                //sorting in desc order
                $sort: {
                    numTourStarts: -1
                }
            }
        ]);

        res.status(200).json({
            status: 'success 🤩',
            data: {
                plan
            }
        });

    } catch (err) {
        //return error to check if monthly plan exist
        next(new AppError('No monthly plan for the request', 404));

        // res.status(404).json({
        //     status: "failed to get monthly plan",
        //     message: err
        // });
    };
};