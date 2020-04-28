const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//Middleware registered
app.use(morgan('dev'));
app.use(express.json());


//Reading the file from a data
const theTours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: theTours.length,
        data: {
            theTours
        }
    })
});


app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = theTours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
});





app.listen('3000', () => {
    console.log('Bro i dey listen to 3000');
});