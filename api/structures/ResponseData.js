const ResponseError = require('./ResponseError');

class ResponseData {
  constructor(params) {
    this.result = params.result || null;
    this.error = params.error ? new ResponseError(params.error) : null;
  }
}

module.exports = ResponseData;
