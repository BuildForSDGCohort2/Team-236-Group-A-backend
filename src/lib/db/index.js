"use strict"

const mongoose = require("mongoose");
const config = require("../../config");
const logger = require("../logger")

const connectDb = () => {
  return mongoose
    .connect(config.get("DB_URL"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      logger().info("db connected successfully");
    });
};

module.exports ={ connectDb}