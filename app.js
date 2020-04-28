const express = require('express');
const morgan = require('morgan');

const app = express();

//Middleware registered
app.use(morgan('dev'));
app.use(express.json());


//adding the route configuration 
const tourRoutes = require('./routes/tours');
const usersRoutes = require('./routes/users');


//registering the route middleware
app.use(tourRoutes);
app.use(usersRoutes);




app.listen('3000', () => {
    console.log('Bro i dey listen to 3000');
});