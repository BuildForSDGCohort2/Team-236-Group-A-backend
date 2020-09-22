"use strict";
const joi = require("joi");
const { objectId } = require("../../lib/utils");
const { roles } = require("../../model/common/constants");

const rolesArr = Object.values(roles);

const getAccountsSchema = joi.object({
  role: joi.string().valid(...rolesArr),
});

const assignRoleSchema = joi.object({
  role: joi
    .string()
    .valid(...rolesArr)
    .required(),
  accountId: objectId().required(),
});

module.exports = {
  getAccountsSchema,
  assignRoleSchema,
};
