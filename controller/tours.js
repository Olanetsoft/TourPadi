const fs = require('fs');
//importing tour model
const Tour = require('./../models/tourModel');


// //Reading the file from a data
// const theTours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

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
        console.log("FIle not created: " + err);
    }

}



//Gets all the tours
exports.getTours = async (req, res, next) => {
    try {
        //creating a copy
        //TO BUILD THE QUERY
        //1) Filtering process
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        
        //2) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        const query = Tour.find(JSON.parse(queryObj));

        //EXECUTE THE QUERY_OBJ
        const allTours = await query;
        

        //SEND RESPONSE IN JSON
        res.status(200).json({
            status: 'success 🙌',
            result: allTours.length,
            data: {
                allTours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err
        });
    }
}


//gets a single tour
exports.getSingleTour = async (req, res, next) => {
    try {
        const singleTour = await Tour.findById(req.params.id);
        //Or Tour.findOne({_id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                singleTour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err
        });
    }

};


//update a single tour
exports.updateTour = async (req, res, next) => {
    try {
        const singleTourUpdate = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                singleTourUpdate
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err
        });
    };

};

//delete a single tour
exports.deleteTour = async (req, res, next) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: "failed to delete",
            message: err
        });
    };

};