const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());


//Reading the file from a data
const theTours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res)=>{
    res.status(200).json({
        status: 'success',
        result: theTours.length,
        data: {
            theTours
        }
    })
}); 





app.listen('3000', ()=>{
    console.log('Bro i dey listen to 3000');
});