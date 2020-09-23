"use strict";
const express = require("express");
const router = express.Router();
const { getAccounts } = require("../../service/accounts");
const { getAccountsSchema } = require("./schema");

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

module.exports = router;
