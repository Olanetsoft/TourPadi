const fs = require('fs');

//Reading the file from a data
const theTours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getTours = (req, res, next) => {
    res.status(200).json({
        status: 'success 🙌',
        result: theTours.length,
        data: {
            theTours
        }
    })
}

exports.getSingleTour = (req, res, next) => {
    const id = req.params.id * 1;
    const tour = theTours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}