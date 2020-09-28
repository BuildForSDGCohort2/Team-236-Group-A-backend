"use strict";
const joi = require("joi");

const addDiseaseSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  remedy: joi.string().required(),
});

const getDiseaseByNameSchema = joi.object({
    name: joi.string().required()
  });

  const updateDiseaseSchema = joi.object({
    name: joi.string(),
    description: joi.string(),
    remedy: joi.string(),
  });



module.exports = { addDiseaseSchema, getDiseaseByNameSchema, updateDiseaseSchema };
