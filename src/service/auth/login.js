"use strict";
const UserModel = require("../../model/users")();
const bcrypt = require("bcrypt");
const { throwError } = require("../../lib/errors");
const { sanitize } = require("../../lib/utils");

async function login({ usernameOrEmail, password }) {
  let match = false;
  const user = await UserModel.get({
    query: { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
  });
  if (user) {
    match = bcrypt.compareSync(password, user.password);
  }
  if (!match) {
    throw throwError({
      name: "ValidationError",
      message: "email/username and password is incorrect",
      code: 400,
    });
  }

  return sanitize(user, "_id", "password", "_v");
}

module.exports = login;
