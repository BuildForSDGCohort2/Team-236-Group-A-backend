"use strict";
const { curry, reject } = require("lodash/fp");
const jsonWebToken = require("jsonwebtoken");
const joi = require("joi");
const cloudinary = require("cloudinary").v2;
const errors = require("./errors");
const config = require("../config");
const { throwError } = require("./errors");
const logger = require("./logger");

const required = (data) => {
  throw errors.throwError({
    name: "MissingFunctionParamError",
    message: `${data} is required`,
    code: 400,
  });
};

const generateJwt = (payload, expiresIn = "1year", algorithm = "HS512") => {
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
      message: error.message.replace(/\"/g, ""),
      code: 400,
    });
  }
  return value;
});

const sanitize = (obj, ...keys) => {
  keys.forEach((key) => {
    delete obj[key];
  });
  return obj;
};

const objectId = () => {
  return joi.string().regex(/^[0-9a-fA-F]{24}$/);
};

const uploadToCloudinary = (image) => {
  return cloudinary.uploader.upload(
    image,
    {
      overwrite: true,
      invalidate: true,
      // width: 810, height: 456, crop: "fill"
    },
    async function (error, result) {
      logger().error(error);
      if (error) {
        throw throwError({
          name: "ImageUploadError",
          code: 400,
          message: "Error occurred while uploading image",
        });
      }

      return result;
    }
  );
};

module.exports = {
  validate,
  generateJwt,
  decodeJwt,
  required,
  objectId,
  sanitize,
  uploadToCloudinary,
};
