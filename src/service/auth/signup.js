"use strict";
const UserModel = require("../../model/users")();
const bcrypt = require("bcrypt");
const { throwError } = require("../../lib/errors");
const { sanitize } = require("../../lib/utils");

async function signUp({ username, email, password }) {
  const checkUserExist = await UserModel.find({
    query: { $or: [{ username }, { email }] },
  });
  if (checkUserExist.length > 0) {
    throw throwError({
      name: "ResourceAlreadyExists",
      message: "Email or username already taken",
      code: 400,
    });
  }
  const hash = bcrypt.hashSync(password, 10);

  const user = await UserModel.create({
    data: { email, username, password: hash },
  });

  return sanitize(user, "_id", "password", "_v");
}

module.exports = signUp;
