const showErrors = function (res, statusCode, message) {
  res.status(statusCode).json({
    err: {
      message,
    },
  });
};

module.exports = showErrors;
