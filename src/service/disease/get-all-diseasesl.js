"use strict";
const { sanitize } = require("../../lib/utils");

const DiseaseModel = require("../../model/disease")();

async function getAllDiseases() {
  const diseases = await DiseaseModel.getAll();
  return sanitize(diseases, "_id", "__v");
}

module.exports = getAllDiseases;
