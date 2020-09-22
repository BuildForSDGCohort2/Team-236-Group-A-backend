const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { throwError } = require("../lib/errors");
const { decodeJwt } = require("../lib/utils");

const authenticate = async (req, res, next) => {
  let token;
  try {
    const bearerHeader = req.headers["authorization"];
    token = bearerHeader.split(" ")[1];
    if (!bearerHeader) {
      message = "No authentication token provided";
      throw new Error(message);
    }
  } catch (error) {
    throw throwError({
      name: "UnauthorizedError",
      code: 401,
      message: "No authentication token provided",
    });
  } //end of if token

  //Split bearerheader to get token
  try {
    const data = await decodeJwt(token);
    next();
  } catch (error) {
    console.log(error);
    throw throwError({
      name: "UnauthorizedError",
      code: 401,
      message: "Unable to authenticate token",
    });
  }
};

module.exports = asyncHandler(authenticate);
