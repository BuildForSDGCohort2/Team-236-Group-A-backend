"use strict";
const AccountModel = require("../../model/accounts")();
const bcrypt = require("bcrypt");
const { throwError } = require("../../lib/errors");
const { sanitize, generateJwt } = require("../../lib/utils");

async function login({ usernameOrEmail, password }) {
  let match = false;
  const account = await AccountModel.get({
    query: { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
  });
  if (account) {
    match = bcrypt.compareSync(password, account.password);
  }
  if (!match) {
    throw throwError({
      name: "ValidationError",
      message: "email/username and password is incorrect",
      code: 400,
    });
  }

  const token = generateJwt({ accountId: account.id, role: account.role });

  return sanitize({ ...account, token }, "_id", "password", "__v");
}

module.exports = login;
