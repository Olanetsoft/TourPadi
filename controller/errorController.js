//import the AppError class
const AppError = require('./../utils/appError');

//A function that handles expired json web token error
const handleJWTExpiredError = () => new AppError('Your token has expired! Please login again', 401);


//A function that handles json web token error
const handleJWTError = () => new AppError('Invalid Token. Please login again!', 401)


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
const sendDevError = (err, req, res) => {
    //API
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        //RENDERED WEBSITE
        res.status(err.statusCode).render('error', {
            title: 'Oops! Something went wrong!',
            msg: err.message
        });
    }
};

//send error for production env
const sendProdError = (err, req, res) => {
    //a) API
    if (req.originalUrl.startsWith('/api')) {
        //Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).render('error', {
                title: 'Oops! Something went wrong!',
                msg: err.message
            });
        }
        //programming error, Don't leak error details
        else {
            //1) Log error
            console.error('ERROR ☹', err);

            //2) Send generic error
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong !'
            });
        };
    } else {
        //b) RENDERED WEBSITE
        console.error('ERROR-----', err);

        res.status(err.statusCode).render('error', {
            title: 'Oops! Something went wrong!',
            msg: 'Please try again later!'
        });
        console.log(err.status)
        console.log(err)
        console.log(err.message)
        console.log(err.stack)
       
    }

};


//export module to handle global error
module.exports = (err, req, res, next) => {
    //gets the statusCode
    err.statusCode = err.statusCode || 500;
    //gets the status
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendDevError(err, req, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        //make a copy of the errors
        let error = { ...err };

        //Check if error is equal to cast error
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        //Check if error is equal to 11000
        if (err.code === 11000) error = handleDuplicateFieldDB(error);
        //Check if error is equal to validationError
        if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
        //Check if error is equal to JsonWebTokenError
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        //Check if error is equal to TokenExpiredError
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();


        sendProdError(error, req, res);
    };
};