class BaseError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
  }
}

class InternalError extends BaseError {
  constructor() {
    super('Internal System Error');
    this.httpCode = 500;
    this.retry = true;
  }
}

class UnknownError extends BaseError {
  constructor() {
    super('Unknown Internal System Error');
    this.httpCode = 500;
    this.retry = true;
  }
}

/**
 * Export
 */
module.exports = {
  BaseError,
  InternalError,
  UnknownError
}
