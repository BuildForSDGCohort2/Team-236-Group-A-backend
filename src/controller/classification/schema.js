"use strict";
const joi = require("joi");

const classificationSchema = joi.object({
  label: joi.string().required(),
  confidence_level: joi.number().required(),
});

const addClassificationSchema = joi.object({
  image: joi.string().required(),
  data: joi.array().items(classificationSchema).required(),
});

module.exports = { addClassificationSchema, classificationSchema };
