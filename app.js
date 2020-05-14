const express = require('express');
const morgan = require('morgan');

const app = express();

//Middleware registered
//Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Middleware registered
app.use(express.json());


//registering a middleware for static files
app.use(express.static(`${__dirname}/public`));

//adding the route configuration 
const tourRoutes = require('./routes/tours');
const usersRoutes = require('./routes/users');

//registering the route middleware
app.use(tourRoutes);
//app.use(usersRoutes);



//Implement a handler to handle all non-existing route
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Failed !',
        message: `Sorry can't find ${req.originalUrl} on the server😫😫`
    })
});


module.exports = app;