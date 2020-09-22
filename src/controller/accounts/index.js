"use strict";
const express = require("express");
const router = express.Router();
const { getAccounts, assignRole } = require("../../service/accounts");
const { validate } = require("../../lib/utils");
const { getAccountsSchema, assignRoleSchema } = require("./schema");

router.get("/", async (req, res, next) => {
  try {
    const { role } = validate(getAccountsSchema, req.query);
    const account = await getAccounts(role);
    return res.status(200).json({ data: account });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.put("/assign-role", async (req, res, next) => {
  try {
    const { role, accountId } = validate(assignRoleSchema, req.body);
    const updatedAccount = assignRole(accountId, role);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
