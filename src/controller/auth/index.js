"use strict";
const express = require("express");
const router = express.Router();
const { signup, login } = require("../../service/auth");
const { validate } = require("../../lib/utils");
const { signupSchema, loginSchema } = require("./schema");
router.post("/signup", async (req, res, next) => {
  try {
    const { email, username, password } = validate(signupSchema, req.body);
    const user = await signup({ username, email, password });
    return res.status(200).json({ data: user });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = validate(loginSchema, req.body);
    const user = await login({ usernameOrEmail, password });
    return res.status(200).json({ data: user });
  } catch (error) {
    // error.status = 400;
    next(error);
  }
});

module.exports = router;
