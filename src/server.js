"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const app = express();
const controller = require("./controller");
const { connectDb, logger } = require("./lib");
const { sendError } = require("./middleware/error");
const error = require("./middleware/error");
app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(controller)
  .use((req, res) => res.status(404).send("Route not found"))
  .use(sendError);


connectDb().then(() =>
  app.listen(config.get("PORT"), () => {
    logger().info(`server started on port ${config.get("PORT")}`);
  })
);
