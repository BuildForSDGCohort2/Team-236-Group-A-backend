"use strict";
const mongoose = require("mongoose");
const schema = require("./schema");
const BaseModel = require("../common/base-model");
const Model = mongoose.model("diseases", schema);

const DiseaseBaseModel = BaseModel(Model);

function getAll() {
  return DiseaseBaseModel.findAll({ query: {}, populate: [] });
}

function getById(id = required("id")) {
  return DiseaseBaseModel.get({ _id: id });
}

function getByName(name = required("name")) {
    return DiseaseBaseModel.get({ query:{name} });
  }

module.exports = function () {
  return {
    ...DiseaseBaseModel,
    getAll,
    getById,
    getByName
  };
};
