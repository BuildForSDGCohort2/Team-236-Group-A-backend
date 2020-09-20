"use strict";
const ClassificationModel = require("../../model/classification")();
const { throwError } = require("../../lib/errors");
const { sanitize, uploadToCloudinary } = require("../../lib/utils");

async function addClassifcation(data, image) {
  const result = await uploadToCloudinary(image);
  const classificationData = await ClassificationModel.create({
    data: { classification: data, image_url: result.secure_url },
  });

  return sanitize(classificationData, "_id", "__v");
}

module.exports = addClassifcation;
