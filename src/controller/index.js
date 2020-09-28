"use strict";
const express = require("express");
const { authenticate } = require("../middleware");
const router = express.Router();
const authRouter = require("./auth");
const classifcationRouter = require("./classification");
const accountRouter = require("./accounts");
const diseaseRouter = require("./diseases")

router.use("/auth", authRouter);
router.use("/classification", authenticate, classifcationRouter);
router.use("/accounts", authenticate, accountRouter);
router.use("/diseases", authenticate, diseaseRouter);


module.exports = router;
