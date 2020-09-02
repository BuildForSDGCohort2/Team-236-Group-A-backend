"use strict";
const mongoose = require("mongoose");
const schema = require("./schema");
const BaseModel = require("../common/base-model");
const Model = mongoose.model("users", schema);

const UserBaseModel = BaseModel(Model);

function getAll() {
  return UserBaseModel.findAll({ query: {}, populate: [] });
}

function getById(ii = required("id")) {
  return UserBaseModel.get({ _id: id });
}

module.exports = function () {
  return {
    ...UserBaseModel,
    getAll,
    getById,
  };
}
