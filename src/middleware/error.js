"use strict";

const sendError = (error, req, res, next) => {
  const { code, details, message, status: statusCode = 500 } = error;
  return res.status(statusCode).json(
    statusCode === 500
      ? { error: { message: "internal server error", code: 500 } }
      : {
          error: {
            code,
            details,
            message,
          },
        }
  );
};

module.exports = {sendError};
