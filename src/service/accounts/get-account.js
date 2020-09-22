"use strict";
const { sanitize } = require("../../lib/utils");

const AccountModel = require("../../model/accounts")();

async function getAccount(accountId) {
  const query = { _id: accountId };
  const account = await AccountModel.get({ query });
  return sanitize(account, "_id", "password", "__v");
}

module.exports = getAccount;
