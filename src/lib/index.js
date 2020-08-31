"use strict";

const mongoose = require("mongoose");
const config = require("../config");
// import logger from '../logger'

const connectDb = () => {
  return mongoose
    .connect(config.get("DB_URL"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("db connected successfully");
    });
};

module.exports = { connectDb };
