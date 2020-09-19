const { STATUS_CODES } = require('../../../constants/api.constants');
const { UNAUTHORIZED } = require('../../../constants/errors');

class UnauthorizedError extends Error {
  constructor() {
    super(UNAUTHORIZED);

    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
