"use strict";
const DiseaseModel = require("../../model/disease")();
const { sanitize, required } = require("../../lib/utils");

async function addDisease(name=required("disease name"), description=required('disease description'), remedy=required('disease remedy')) {
  const diseaseData = await DiseaseModel.create({
    data: { name, description, remedy},
  });

  return sanitize(diseaseData, "_id", "__v");
}

module.exports = addDisease;
