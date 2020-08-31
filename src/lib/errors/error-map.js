"use strict";
const httpstatus = {
  OK: 200,
  CREATED: 201,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  TOO_MANY_REQUESTS: 429,
  SERVICE_UNAVAILABLE: 503,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  MissingFunctionParamError: httpstatus.BAD_REQUEST,
  ResourceAlreadyExists: httpstatus.BAD_REQUEST,
  ResourceDoesNotExists: httpstatus.BAD_REQUEST,
  ValidationError: httpstatus.BAD_REQUEST,
};
