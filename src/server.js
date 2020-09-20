"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const app = express();
const controller = require("./controller");
const { connectDb, logger } = require("./lib");
const { sendError } = require("./middleware/error");
app
  .use(bodyParser.json({ limit: "10mb" }))
  .use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
  .use(bodyParser.json())
  .use(cors())
  .use(controller)
  .use((req, res) => res.status(404).send("Route not found"))
  .use(sendError);

connectDb().then(() =>
  app.listen(config.get("PORT"), () => {
    logger().info(`server started on port ${config.get("PORT")}`);
  })
);
