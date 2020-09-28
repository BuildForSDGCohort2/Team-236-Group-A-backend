"use strict";
const DiseaseModel = require("../../model/disease")();

async function updateDisease(diseaseId, data) {
  const result = await DiseaseModel.update({
    query: { _id: diseaseId },
    data,
  });
  return result;
}

module.exports = updateDisease;
