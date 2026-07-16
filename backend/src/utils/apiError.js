class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.message = message;
  }
}

module.exports = ApiError;
