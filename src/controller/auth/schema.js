"use strict";
const joi = require("joi");

const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
  username: joi.string().required(),
});

const loginSchema = joi.object({
  usernameOrEmail: joi.string().required(),
  password: joi.string().min(6).max(16).required(),
});

module.exports = { signupSchema, loginSchema };
