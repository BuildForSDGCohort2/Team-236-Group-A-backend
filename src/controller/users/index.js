"use strict";
const express = require("express");
const router = express.Router();
const { createUser } = require("../../service/users");
const { validate } = require("../../lib/utils");
const { createUserSchema } = require("./schema");
router.post("/", async (req, res, next) => {
  try {
    const { email, username, password, role } = validate(
      createUserSchema,
      req.body
    );
    await createUser({ username, email, role, password });
    return res.status(200).send("huray user created");
  } catch (error) {
      next(error)
  }
});

module.exports = router;
