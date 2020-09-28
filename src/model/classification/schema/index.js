"use strict";
const mongoose = require("mongoose");
const { string, required } = require("joi");

const classificationSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  confidence_level: {
    type: Number,
    required: true,
  },
});

const schema = new mongoose.Schema(
  {
    classification: [classificationSchema],
    image_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

module.exports = schema;
