//import the AppError class
const AppError = require('./../utils/appError');

//A function that handles cast error
const handleCastErrorDB = err => {
    //get the message sent by mongo
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}


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
        if(err.name === 'CastError') error = handleCastErrorDB(error)
        sendProdError(error, res);
    };
};