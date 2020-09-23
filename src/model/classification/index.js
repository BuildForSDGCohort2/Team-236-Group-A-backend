"use strict";
const mongoose = require("mongoose");
const schema = require("./schema");
const BaseModel = require("../common/base-model");
const Model = mongoose.model("classifcations", schema);

const ClassificationBaseModel = BaseModel(Model);

function getAll() {
  return ClassificationBaseModel.findAll({ query: {}, populate: [] });
}

function getById(id = required("id")) {
  return ClassificationBaseModel.get({ _id: id });
}

module.exports = function () {
  return {
    ...ClassificationBaseModel,
    getAll,
    getById,
  };
};
