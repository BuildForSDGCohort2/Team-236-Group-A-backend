"use strict";
const { sanitize } = require("../../lib/utils");

const AccountModel = require("../../model/accounts")();

async function getAccounts(role) {
  const query = role ? { role } : {};
  const accounts = await AccountModel.find({ query });
  return sanitize(accounts, "_id", "password", "__v");
}

module.exports = getAccounts;
