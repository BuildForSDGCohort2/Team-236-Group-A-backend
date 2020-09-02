"use strict";
const { curry, reject } = require("lodash/fp");
const jsonWebToken = require("jsonwebtoken");
const joi = require("joi");
const errors = require("./errors");
const config = require("../config");


const required = (data) => {
    throw errors.throwError({
      name: errors.MissingFunctionParamError,
      message: `${data} is required`,
    });
  };
  
const generateJwt = (payload, expiresIn = "10days", algorithm = "HS512") => {
  return jsonWebToken.sign(payload, config.get("APP_KEY"), {
    expiresIn,
    algorithm,
  });
};

const decodeJwt = (token = required("token")) => {
  return new Promise((resolve, reject) => {
    jsonWebToken.verify(token, config.get("APP_KEY"), (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

const validate = curry((schema, data) => {
  const { error, value } = schema.validate(data, { stripUnknown: true });
  if (error) {
    throw errors.throwError({
      name: "ValidationError",
      message: error.message
    });
  }
  return value;
});


const objectId = () => {
  return joi.string().regex(/^[0-9a-fA-F]{24}$/);
};

module.exports = { validate, generateJwt, decodeJwt, required, objectId };
