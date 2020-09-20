"use strict";
const express = require("express");
const { authenticate } = require("../middleware");
const router = express.Router();
const authRouter = require("./auth");
const classifcationRouter = require("./classification");
router.use("/auth", authRouter);
router.use("/classification", authenticate, classifcationRouter);

module.exports = router;
