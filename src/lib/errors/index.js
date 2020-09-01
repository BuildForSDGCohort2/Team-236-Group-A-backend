"use strict";
const customError = require("./custom-error");
const errorMap = require("./error-map");

module.exports = {
  throwError: customError,
  ...errorMap,
};
