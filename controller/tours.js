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
            newTour
        })
    } catch(err){
        res.status(400).json({
            status: 'failed',
            message: err
        }) 
        console.log("FIle not created: " + err);
    }
    
}



//Gets all the tours
exports.getTours = (req, res, next) => {
    res.status(200).json({
        status: 'success 🙌',
        // result: theTours.length,
        // data: {
        //     theTours
        // }
    })
}

//gets a single tour
// exports.getSingleTour = (req, res, next) => {
//     const id = req.params.id * 1;
//     const tour = theTours.find(el => el.id === id)

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     });
// }