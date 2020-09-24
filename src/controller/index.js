"use strict";
const express = require("express");
const { authenticate } = require("../middleware");
const router = express.Router();
const authRouter = require("./auth");
const classifcationRouter = require("./classification");
const accountRouter = require("./accounts");

router.use("/auth", authRouter);
router.use("/classification", authenticate, classifcationRouter);
router.use("/accounts", authenticate, accountRouter);

module.exports = router;
