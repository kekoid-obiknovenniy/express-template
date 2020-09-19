const { STATUS_CODES } = require('../../../constants/api.constants');

class BadRequestError extends Error {
  constructor(params) {
    super(params.message);

    this.statusCode = STATUS_CODES.BAD_REQUEST;
    this.path = params.path;
  }
}

module.exports = BadRequestError;
