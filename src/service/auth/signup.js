"use strict";
const AccountModel = require("../../model/accounts")();
const bcrypt = require("bcrypt");
const { throwError } = require("../../lib/errors");
const { sanitize, generateJwt } = require("../../lib/utils");
const { roles } = require("../../model/common/constants");

async function signUp({ username, email, password }) {
  const userExist = await AccountModel.get({
    query: { $or: [{ username }, { email }] },
  });
  if (userExist) {
    throw throwError({
      name: "ResourceAlreadyExists",
      message: "Email or username already taken",
      code: 400,
    });
  }
  const hash = bcrypt.hashSync(password, 10);

  const account = await AccountModel.create({
    data: { email, username, password: hash, role: roles.user },
  });
  const token = generateJwt({ accountId: account.id });

  return sanitize({ ...account, token }, "_id", "password", "__v");
}

module.exports = signUp;
