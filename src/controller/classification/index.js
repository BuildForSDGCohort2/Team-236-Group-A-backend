"use strict";
const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware");
const { addClassification } = require("../../service/classification");
const { validate } = require("../../lib/utils");
const { addClassificationSchema } = require("./schema");
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { image, data } = validate(addClassificationSchema, req.body);
    const classification = await addClassification(data, image);
    return res.status(200).json({ data: classification });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
