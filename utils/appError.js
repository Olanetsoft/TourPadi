class AppError extends Error {
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        //set the stack trace to know where the error occurred
        Error.captureStackTrace(this, this.constructor);
    }

};

module.exports = AppError;