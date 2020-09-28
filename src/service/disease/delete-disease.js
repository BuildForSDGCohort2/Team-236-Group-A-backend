"use strict";
const DiseaseModel = require("../../model/disease")();

async function deleateDisease(diseaseId) {
  const result = await DiseaseModel.deleteOne({
    query: { _id: diseaseId }
  });
  return result;
}

module.exports = deleateDisease;
