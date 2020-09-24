const errors = require("../lib/errors");
const { roles } = require("../model/common/constants");

const ensureAdmin = (req, res, next) => {
  let message;
  const isAdmin = req.decodedJwt.role === roles.admin;
  if (!isAdmin) {
    message = "You are not allowed to access this resource";
    throw errors.throwError({
      name: "ForbiddenError",
      code: 403,
      message: message,
    });
  }
};

module.exports = ensureAdmin;
