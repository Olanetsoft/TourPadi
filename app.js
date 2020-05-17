const express = require('express');
const morgan = require('morgan');

//import global error class
const AppError = require('./utils/appError');

//import the global error handler
const globalErrorHandler = require('./controller/errorController')

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


//a middleware to test
app.use((req, res, next) => {
    //console.log(req.headers);
    next();
});


//registering the route middleware
app.use(tourRoutes);
app.use(usersRoutes);


//Implement a handler to handle all non-existing route
app.all('*', (req, res, next) => {
    // const err = new Error(`Sorry can't find ${req.originalUrl} on the server😫😫`);
    // err.status = 'fail';
    // err.statusCode = 400;
    next(new AppError(`Sorry can't find ${req.originalUrl} on the server😫😫`, 404))
});


//error handling middleware
app.use(globalErrorHandler);

module.exports = app;