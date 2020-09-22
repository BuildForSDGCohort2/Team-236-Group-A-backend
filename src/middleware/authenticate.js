const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { decodeJwt } = require("../lib/utils");
const errors = require("../lib/errors");

const authenticate = async (req, res, next) => {
  let token;
  try {
    let bearerHeader = req.headers["authorization"];
    token = bearerHeader.split(" ")[1];
    if (!bearerHeader) {
      message = "No authentication token provided";
      throw new Error(message);
    }
  } catch (error) {
    throw errors.throwError({
      name: "UnauthorizedError",
      code: 401,
      message: "No authentication token provided",
    });
  }

  try {
    const data = await decodeJwt(token);
    req.decodedJwt = data;
    next();
  } catch (error) {
    throw errors.throwError({
      name: "UnauthorizedError",
      code: 401,
      message: "Unable to authenticate token",
    });
  }
};

module.exports = asyncHandler(authenticate);
