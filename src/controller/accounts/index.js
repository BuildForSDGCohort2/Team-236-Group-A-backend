"use strict";
const express = require("express");
const router = express.Router();
const {
  getAccounts,
  assignRole,
  getAccount,
} = require("../../service/accounts");
const { validate } = require("../../lib/utils");
const {
  getAccountsSchema,
  assignRoleSchema,
  getAccountSchema,
} = require("./schema");

router.get("/", async (req, res, next) => {
  try {
    const { role } = validate(getAccountsSchema, req.query);
    const accounts = await getAccounts(role);
    return res.status(200).json({ data: accounts });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get("/:accountId", async (req, res, next) => {
  try {
    const { accountId } = validate(getAccountSchema, req.params);
    const account = await getAccount(accountId);
    return res.status(200).json({ data: account });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.put("/assign-role", async (req, res, next) => {
  try {
    const { role, accountId } = validate(assignRoleSchema, req.body);
    await assignRole(accountId, role);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
