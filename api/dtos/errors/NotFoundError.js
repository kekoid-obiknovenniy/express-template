const { STATUS_CODES } = require('../../../constants/api.constants');
const { NOT_FOUND } = require('../../../constants/errors');

class NotFoundError extends Error {
  constructor(params) {
    super(NOT_FOUND);

    this.statusCode = STATUS_CODES.NOT_FOUND;
    this.path = params.path;
  }
}

module.exports = NotFoundError;
