/**
 * Require
 */
const { BaseError } = require('./customErrors');

class ValidationError extends BaseError {
    constructor(message){
        super(message);
        this.httpCode = 400;
        this.retry = false;
    }
}

/**
 * Export
 */
module.exports = {
    ValidationError
}