
"use strict";
const { get } = require("lodash/fp");
const ERROR_MESSAGE = Symbol("new error message");
const ERROR_CODE = Symbol("new error code");
const ERROR_NAME = Symbol("new error name");
const { required } = require("../utils");

const getMessage = get(ERROR_MESSAGE);
const getCode = get(ERROR_CODE);
const getName = get(ERROR_NAME);

function customError({
  name = required("name"),
  message = required("message"),
  code
}) {
  const error = new Error(message);
  error.name = name;
  error.status = code;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, customError);
  }

  Object.defineProperties(error, {
    [ERROR_MESSAGE]: {
      get() {
        return message;
      }
    },
    [ERROR_CODE]: {
      get() {
        return code;
      }
    },
    [ERROR_NAME]: {
      get() {
        return name;
      }
    }
  });

  return error;
}

/**
 * Create a custom error type
 * @param {Object} error -
 * @param {string} error.name - Name of the error  like UserDoesNotExistError
 * @param {string} error.message  - Message of the error
 * @param {string} [error.code] - Code like 200,500
 */
module.exports = Object.assign(customError, {
  getMessage,
  getCode,
  getName
});
