module.exports = (err, req, res, next) => {
    //gets the statusCode
    err.statusCode = err.statusCode || 500;
    //gets the status
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
};