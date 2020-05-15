//import the AppError class
const AppError = require('./../utils/appError');

//A function that handles cast error
const handleCastErrorDB = err => {
    //get the message sent by mongo
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};


//A function that handles duplicate field
const handleDuplicateFieldDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    //get the message sent by mongo  driver
    const message = `Duplicate field value${value}. Please use another value.`;
    return new AppError(message, 400);
};


//A function that handles duplicate field
const handleValidationErrorDB = err => {
    const errors = object.values(err.errors).map(el => el.message);

    //get the message sent by mongo  driver
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};


//Send error for development env
const sendDevError = (err, res)=> {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

//send error for production env
const sendProdError = (err, res) => {
    //Operational, trusted error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    //programming error, Don't leak error details
    else{
        //1) Log error
        console.error('ERROR ☹', err);

        //2) Send generic error
        res.status(500).json({
            status: 'error 🙄',
            message: 'Something went wrong !'
        });
    };
    
};


//export module to handle global error
module.exports = (err, req, res, next) => {
    //gets the statusCode
    err.statusCode = err.statusCode || 500;
    //gets the status
    err.status = err.status || 'error';

    if(process.env.NODE_ENV == 'development'){
        sendDevError(err, res);
    }
    else if(process.env.NODE_ENV == 'production'){
        //make a copy of the errors
        let error = {...err};

        //Check if error is equal to cast error
        if(err.name === 'CastError') error = handleCastErrorDB(error);
        //Check if error is equal to 11000
        if(err.code === 11000) error = handleDuplicateFieldDB(error);
        //Check if error is equal to validationError
        if(err.name === 'ValidationError') error = handleValidationErrorDB(error);
        sendProdError(error, res);
    };
};