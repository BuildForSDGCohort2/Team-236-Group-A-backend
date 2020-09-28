"use strict";
const { sanitize, required } = require("../../lib/utils");

const DiseaseModel = require("../../model/disease")();

async function getDiseaseByName(name=required("name")) {
  const disease = await DiseaseModel.getByName(name);
  return sanitize(disease, "_id", "__v");
}

module.exports = getDiseaseByName;
