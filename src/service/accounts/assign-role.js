"use strict";
const AccountModel = require("../../model/accounts")();

async function assignRole(accountId, role) {
  const result = await AccountModel.update({
    query: { _id: accountId },
    data: { role },
  });
  return result;
}

module.exports = assignRole;
