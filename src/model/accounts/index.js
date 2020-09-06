"use strict";
const mongoose = require("mongoose");
const schema = require("./schema");
const BaseModel = require("../common/base-model");
const Model = mongoose.model("accounts", schema);

const AccountBaseModel = BaseModel(Model);

function getAll() {
  return AccountBaseModel.findAll({ query: {}, populate: [] });
}

function getById(id = required("id")) {
  return AccountBaseModel.get({ _id: id });
}

module.exports = function () {
  return {
    ...AccountBaseModel,
    getAll,
    getById,
  };
};
