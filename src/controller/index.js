"use strict";
const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const classifcationRouter = require("./classification");
router.use("/auth", authRouter);
router.use("/classification", classifcationRouter);

module.exports = router;
