/**
 * Require
 */
const { BaseError, UnknownError } = require("../errors/customErrors");

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);
    if(!(err instanceof BaseError)){
        err = new UnknownError();
    }
    let customError = {
        // setting default values if not provided
        message: err.message || 'Something went wrong try again later',
        retry: err.retry || false,
        statusCode: err.httpCode || 500
    };
    res.status(customError.statusCode).json(customError);
};

/**
 * Export
 */
module.exports = {
    errorHandlerMiddleware
};
