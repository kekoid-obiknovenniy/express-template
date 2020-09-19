class ResponseError {
  constructor(error) {
    this.path = error.path || null;
    this.message = error.message;
  }
}

module.exports = ResponseError;
