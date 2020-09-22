"use strict";
const joi = require("joi");
const { roles } = require("../../model/common/constants");

const rolesArr = Object.values(roles);

const getAccountsSchema = joi.object({
  role: joi.string().valid(...rolesArr),
});

module.exports = {
  getAccountsSchema,
};
